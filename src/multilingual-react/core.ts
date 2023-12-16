import React from 'react';

interface Resources {
  [key: string]: string | Resources;
}

interface Options {
  resources: Resources;
  lang: keyof Resources;
}

export default class MultilingualReact {
  static options: Options | undefined | null = undefined;
  static Context: React.Context<Options>;

  static init(options: Options) {
    MultilingualReact.options = options;
    MultilingualReact.Context = React.createContext(options);
  }
}
