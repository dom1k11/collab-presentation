import { en, ru, zh_CN } from "@faker-js/faker";

export const LOCALES: Record<string, any> = {
  "en-US": en,
  "ru-RU": ru,
  "zh-CN": zh_CN,
};

export const SUPPORTED_LANGUAGES = [
  { code: "en-US", name: "English", flag: "🇺🇸" },
  { code: "ru-RU", name: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
];
