export type SettingsCharacterId = 'A' | 'B' | 'C' | 'D';

/** Fictional, read-only display values. No setting is saved or changed by the app. */
export type SettingsProfile = Readonly<{
  characterName: string;
  deviceModel: string;
  accountSubtitle: string;
  wifiName: string | null;
  bluetoothEnabled: boolean;
  airplaneMode: boolean;
  batteryPercent: number;
  accountSuggestionsBadge: number;
  generalBadge: number;
  brightnessPercent: number;
  theme: '라이트' | '다크';
  textSize: string;
  ringtone: string;
  wallpaperName: string;
}>;

// Each profile is a separate frozen object; all fields are primitive values.
export const settingsProfiles: Readonly<Record<SettingsCharacterId, SettingsProfile>> = Object.freeze({
  A: Object.freeze({
    characterName: '최도안',
    deviceModel: 'iPhone 13 mini',
    accountSubtitle: '최도안의 iPhone 13 mini',
    wifiName: 'DOAN_HOME',
    bluetoothEnabled: true,
    airplaneMode: false,
    batteryPercent: 82,
    accountSuggestionsBadge: 1,
    generalBadge: 1,
    brightnessPercent: 45,
    theme: '라이트',
    textSize: '기본',
    ringtone: '반사',
    wallpaperName: '분홍빛 곡선',
  }),
  B: Object.freeze({
    characterName: '임형우',
    deviceModel: 'iPhone 15',
    accountSubtitle: '임형우의 iPhone 15',
    wifiName: 'HYEONGWOO_WIFI',
    bluetoothEnabled: true,
    airplaneMode: false,
    batteryPercent: 67,
    accountSuggestionsBadge: 0,
    generalBadge: 1,
    brightnessPercent: 60,
    theme: '라이트',
    textSize: '기본',
    ringtone: '도입',
    wallpaperName: '블루와 민트',
  }),
  C: Object.freeze({
    characterName: '윤연도',
    deviceModel: 'Galaxy S25',
    accountSubtitle: '윤연도의 Galaxy S25',
    wifiName: null,
    bluetoothEnabled: true,
    airplaneMode: false,
    batteryPercent: 74,
    accountSuggestionsBadge: 0,
    generalBadge: 0,
    brightnessPercent: 55,
    theme: '라이트',
    textSize: '기본',
    ringtone: 'Over the Horizon',
    wallpaperName: '민트빛 물결',
  }),
  D: Object.freeze({
    characterName: '강려운',
    deviceModel: 'iPhone 18 Pro',
    accountSubtitle: '강려운의 iPhone 18 Pro',
    wifiName: 'RYEOWOON_HOME',
    bluetoothEnabled: false,
    airplaneMode: false,
    batteryPercent: 93,
    accountSuggestionsBadge: 2,
    generalBadge: 0,
    brightnessPercent: 40,
    theme: '라이트',
    textSize: '기본',
    ringtone: '물결',
    wallpaperName: '연분홍',
  }),
});

/** Unknown identifiers safely use A's display profile. */
export function getSettingsProfile(id: string): SettingsProfile {
  if (Object.prototype.hasOwnProperty.call(settingsProfiles, id)) {
    return settingsProfiles[id as SettingsCharacterId];
  }
  return settingsProfiles.A;
}
