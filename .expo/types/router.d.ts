/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/src/services/api`; params?: Router.UnknownInputParams; } | { pathname: `/src/types`; params?: Router.UnknownInputParams; } | { pathname: `/src/utilities/hooks/useTasks`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/src/screens/HomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/src/services/api`; params?: Router.UnknownOutputParams; } | { pathname: `/src/types`; params?: Router.UnknownOutputParams; } | { pathname: `/src/utilities/hooks/useTasks`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/src/screens/HomeScreen${`?${string}` | `#${string}` | ''}` | `/src/services/api${`?${string}` | `#${string}` | ''}` | `/src/types${`?${string}` | `#${string}` | ''}` | `/src/utilities/hooks/useTasks${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/src/screens/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/src/services/api`; params?: Router.UnknownInputParams; } | { pathname: `/src/types`; params?: Router.UnknownInputParams; } | { pathname: `/src/utilities/hooks/useTasks`; params?: Router.UnknownInputParams; };
    }
  }
}
