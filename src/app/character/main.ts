import { PlatformRef } from '@angular/core/src/application_ref';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CharacterModule } from './character.module';

export * from './character.component';
export * from './character.routes';

const platform: PlatformRef = platformBrowserDynamic();
platform.bootstrapModule(CharacterModule);
