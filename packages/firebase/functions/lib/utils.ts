export const firebaseDataToElasticData = function (origObj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(origObj).reduce(function (newObj: Record<string, unknown>, key: string) {
    let val: Record<string, unknown> | unknown;
    let newKey: string;
    let newVal: Record<string, unknown> | unknown;
    if (key.indexOf('.') >= 0) {
      const parts = key.split('.');
      newKey = parts[0];
      val = parts.slice(1).reduceRight((obj, elem, index) => ({ [elem]: index === 0 ? origObj[key] : obj }), {});
    } else {
      val = origObj[key];
      newKey = key;
    }

    if (!Array.isArray(val) && typeof val === 'object' && val !== null && Object.keys(val).length) {
      newVal = firebaseDataToElasticData(val as Record<string, unknown>);
    } else {
      newVal = val;
    }
    // todo: sanitize timestamps
    if (key === 'createdAt' || key === 'updatedAt') {
      if (val && typeof (val as FirebaseFirestore.Timestamp).toDate === 'function') {
        newVal = (val as FirebaseFirestore.Timestamp).toDate().toISOString();
      }
    }
    newObj[newKey.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase())] = newVal;
    return newObj;
  }, {});
};
