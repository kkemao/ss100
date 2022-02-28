import * as crypto from 'crypto';

/**
 * Make salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}

// 微信官方解密方法  https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95
const { createDecipheriv } = crypto;

function WXBizDataCrypt_(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt_.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  let sessionKey = Buffer.from(this.sessionKey, 'base64');
  encryptedData = Buffer.from(encryptedData, 'base64');
  iv = Buffer.from(iv, 'base64');

  try {
    // 解密
    let decipher = createDecipheriv('aes-128-cbc', sessionKey, iv); // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true);
    let decoded: any = decipher.update(encryptedData, 'binary', 'utf8');
    decoded += decipher.final('utf8');

    decoded = JSON.parse(decoded);

    if (decoded.watermark.appid !== this.appId) {
      return { err: 'appid不一致', data: null };
    }

    return { err: null, data: decoded };
  } catch (err) {
    return { err, data: null };
  }
};
export const WXBizDataCrypt = WXBizDataCrypt_;
