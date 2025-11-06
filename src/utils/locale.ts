import { UA, EN } from '../locales/index'

import type { LangKey } from '../types';

const language = {
    UA,
    EN
}

export default function userLanguageHandler(key: LangKey = 'UA') {
    return language[key];
}