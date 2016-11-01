import { Input, OnInit, OnDestroy, Component, ComponentFactory,
    ComponentRef, ViewContainerRef, ComponentFactoryResolver,
    ViewChild, ChangeDetectorRef } from '@angular/core';

import { Card, CardComponent } from './card.component';
import { db } from '../database/database.module';

@Component({
    moduleId: module.id,
    selector: 'powers',
    template: `<template #dynamicCards></template>`,
    entryComponents: [CardComponent]
})

export class PowersComponent implements OnInit, OnDestroy {
    private _cards: ComponentRef<CardComponent>[]

    @ViewChild('dynamicCards', { read: ViewContainerRef })
    private dynamicCards: ViewContainerRef

    private cmpFactory: ComponentFactory<CardComponent>

    constructor(private ref: ChangeDetectorRef, private resolver: ComponentFactoryResolver) {
        this.cmpFactory = this.resolver.resolveComponentFactory(CardComponent)

        this._cards = []
    }

    ngOnInit() {
        db.cards.find({}, (err: any, docs: any) => {
            for (let card of docs) {
                this.inject(<Card>card)
            }

            this.ref.detectChanges()
        });
    }

    ngOnDestroy() {
        for (let cmp of this._cards) {
            cmp.destroy()
        }
    }

    inject(card: Card) {
        let ref: ComponentRef<CardComponent> = this.dynamicCards.createComponent(this.cmpFactory);
        ref.instance.card = card
        this._cards.push(ref)
    }

    addCard(card: Card) {
        this.inject(card)
        //TODO(alan): Add to db
    }

    get cards() {
        return this._cards;
    }
}