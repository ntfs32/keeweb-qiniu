/**
 * KeeWeb plugin: keeweb-qiniu
 * @author ntfs32
 * @license MIT
 */

const Storage = require('storage/index');
const BaseLocale = require('locales/base');
const StorageBase = require('storage/storage-base');

const QiniuStorage = StorageBase.extend({
    name: 'QiniuStorage',
    iconSvg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1537434508939" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="781" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M462.9504 376.832c14.336-31.5392-3.8912-19.6608-3.8912-19.6608S395.264 461.4144 238.2848 461.4144c-24.8832 0-47.3088-2.6624-67.584-7.168-8.8064-29.3888-20.7872-51.9168-38.8096-55.296 0 0 0.8192 18.3296 2.3552 44.544-80.896-30.1056-114.5856-87.8592-114.5856-87.8592s-13.824-17.2032-7.8848 8.9088c4.5056 19.7632 38.5024 97.9968 126.1568 134.5536 3.7888 49.4592 9.216 102.2976 16.1792 120.1152 14.336 36.4544 32.0512 39.936 85.7088 39.936s82.7392-4.4032 90.624-35.4304c7.8848-31.0272 16.2816-101.4784 15.2576-104.96s0.4096-12.0832-14.336 0.512c-19.3536 16.5888-40.0384 83.7632-45.6704 90.112-5.9392 6.8608-48.64 16.896-73.1136 7.5776-13.1072-9.4208-19.5584-56.1152-28.4672-103.8336 16.6912 3.2768 34.9184 5.12 54.5792 5.12 164.1472 0 210.0224-109.8752 224.256-141.4144zM532.0704 502.272c-5.9392-3.1744-12.5952-5.632-19.968-7.2704-7.3728-1.6384-14.848-2.4576-22.3232-2.4576-7.4752 0-14.9504 0.8192-22.3232 2.4576-7.3728 1.6384-14.0288 4.096-19.968 7.2704-5.9392 3.1744-10.752 7.2704-14.336 12.288-3.584 4.9152-5.4272 10.6496-5.4272 17.1008v84.5824c0 6.5536 1.8432 12.288 5.4272 17.2032 3.584 4.9152 8.3968 8.9088 14.336 12.1856 5.9392 3.2768 12.5952 5.632 19.968 7.2704 7.3728 1.6384 14.848 2.4576 22.3232 2.4576 1.536 0 3.1744 0 4.7104-0.1024 1.3312 5.8368 3.8912 10.24 6.3488 13.2096 2.8672 3.4816 7.168 5.5296 11.776 5.5296h31.3344c2.4576 0 4.5056-2.048 4.5056-4.5056V651.264c0-2.4576-2.048-4.608-4.5056-4.5056-2.4576 0.1024-5.5296-0.1024-7.8848-1.024-1.024-0.4096-1.7408-1.1264-2.2528-1.8432 7.0656-5.0176 12.6976-11.264 12.6976-11.264 3.584-4.608 5.4272-10.1376 5.4272-16.384v-84.5824c0-6.4512-1.8432-12.1856-5.4272-17.1008-3.7888-5.0176-8.4992-9.0112-14.4384-12.288z m-17.3056 113.8688v0.4096s-0.4096 13.7216-17.1008 14.848c-2.1504 0.6144-4.8128 0.9216-7.9872 0.9216-6.7584 0-12.6976-1.3312-17.6128-3.8912-4.9152-2.6624-7.4752-6.7584-7.4752-12.288v-84.5824c0-5.5296 2.4576-9.6256 7.4752-12.288 4.9152-2.6624 10.8544-3.8912 17.6128-3.8912s12.6976 1.3312 17.6128 3.8912c4.9152 2.6624 7.4752 6.7584 7.4752 12.288v84.5824zM585.6256 493.8752h37.0688v160.0512h-37.0688V493.8752zM749.3632 590.336h-0.7168l-55.9104-96.4608h-35.6352v160.0512h37.0688v-96.256h0.7168l56.6272 96.256h34.816V493.8752h-37.0688v96.4608zM820.9408 493.8752h37.0688v160.0512h-37.0688V493.8752zM976.6912 493.8752v121.856c0 5.7344-2.1504 9.9328-6.5536 12.5952-4.4032 2.6624-9.8304 4.096-16.384 4.096s-11.9808-1.3312-16.384-4.096c-4.4032-2.6624-6.5536-6.8608-6.5536-12.5952v-121.856h-36.864v124.1088c0 5.2224 1.536 10.1376 4.7104 14.6432 3.1744 4.5056 7.4752 8.3968 12.9024 11.776 5.4272 3.3792 11.776 6.0416 19.0464 7.9872 7.2704 1.9456 15.0528 2.9696 23.2448 2.9696s15.9744-1.024 23.2448-2.9696 13.6192-4.608 19.0464-7.9872c5.4272-3.3792 9.728-7.2704 12.9024-11.776 3.1744-4.5056 4.7104-9.3184 4.7104-14.6432V493.8752h-37.0688z" fill="" p-id="782"></path></svg>',
    enabled: true,
    uipos: 100,

    needShowOpenConfig: function() {
        return true;
    },
    getOpenConfig: function() {
        return {
            fields: [
                {id: 'path', title: 'domain', desc: 'Storage Domain', placeholder: 'https://***.com1.z0.glb.clouddn.com', type: 'text', required: true},
                {id: 'path', title: 'ak', desc: 'Access Key', type: 'text', required: true},
                {id: 'path', title: 'sk', desc: 'Secret Key', type: 'password', required: true},
                {id: 'path', title: 'storagepath', desc: 'Storage Path', type: 'text', required: true}
            ]
        };
    },

    getSettingsConfig: function() {
        return {
            fields: [
                { id: 'webdavSaveMethod', title: 'webdavSaveMethod', type: 'select',
                    value: this.appSettings.get('webdavSaveMethod') || 'default',
                    options: { default: 'webdavSaveMove', put: 'webdavSavePut' } }
            ]
        };
    },


    getPathForName(fileName) {
        return fileName;
    },

    load(path, opts, callback) {
        callback('fail load');
    },

    stat(path, opts, callback) {
        console.log(path,opts)
        callback('fail stat');
    },

    save(path, opts, data, callback, rev) {
        callback('fail save');
    },

    list(dir, callback) {
        callback('fail list');
    },

    remove(path, callback) {
        callback('fail remove');
    },

    setEnabled(enabled) {
        StorageBase.prototype.setEnabled.call(this, enabled);
    }
});

BaseLocale.QiniuStorage = '七牛云';

Storage.QiniuStorage = new QiniuStorage();

module.exports.uninstall = function() {
    delete BaseLocale.QiniuStorage;
    delete Storage.QiniuStorage;
};



// module.exports.getSettings = function() {
//     return [{
//         name: 'placepath',
//         label: '空间名称',
//         type: 'text',
//         placeholder: 'keeweb',
//         value: ''
//     }, {
//         name: 'ak',
//         label: 'AK',
//         type: 'text',
//         placeholder: 'Access Key',
//         value: ''
//     }, {
//         name: 'sk',
//         label: 'SK',
//         type: 'text',
//         placeholder: 'Secret Key',
//         value: ''
//     }, {
//         name: 'domain',
//         label: '访问域名',
//         type: 'text',
//         placeholder: '空间名称， 例如: https://***.com1.z0.glb.clouddn.com',
//         value: ''
//     }];
// };
