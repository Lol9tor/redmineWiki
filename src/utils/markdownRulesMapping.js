import _ from 'underscore';
import * as urls from '../constants/urls';
import textile from 'textile-js';

const urlRegex = /((?:(https?|ftp|www)+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))/gi,
    internalLinksRegex = /\[\[\s*([\u0430-\u044F\u0451\u0410-\u042F\u0401\w\d\s\_\-\\\/\.\'\,\+\(\)\|]+)\s*\]\]/g, // \u0430-\u044F\u0451\u0410-\u042F\u0401 - for cyrillic symbols
    underLineRegex = /(?:\s\_)(.*)(?:\_\s)/g;

function replacerURL(str, substr) {
    const i = arguments[arguments.length-2],
        allString = arguments[arguments.length-1];
    if (allString[i-1] === '!' || allString[i-1] === ':') { //rule for img url & for already done url
        return str;
    }
    return '"'+str+'":'+str;
}

function insert(str, index, value) {
    return str.slice(0, index) + value + str.slice(index);
}

function addInternalLinkClass(string) {
    let i = 0,
        inputsArr = [],
        newString = string;
    const className = '(internalLinks).';
    while ((inputsArr = internalLinksRegex.exec(string)) !== null) {
        let charIndex = inputsArr.index-2;
        if (/\./g.test(string[charIndex])) {
            newString = insert(newString, charIndex+(className.length)*i, className);
            i++;
        }
    }
    return newString;
}

export function transformString(string) {
    return string.replace(urlRegex, replacerURL);
}

export function replacerInternalLinks(string, project) {
    let newString = addInternalLinkClass(string);
    return newString.replace(internalLinksRegex, function (str, subStr) {
        const subStrArrSepar = subStr.split('|'),
            underlineSubStr = subStrArrSepar[0].replace(/\s/g, '_')
                                               .replace(/\./g, ''),
            subStrSepar = subStrArrSepar[1] || subStrArrSepar[0];

        return '"'+subStrSepar+'":'+
            urls.BASE_URL+'/'+project+urls.WIKI+'/'+underlineSubStr;
    }
    );
}

export default function transformTextileToHtml(text, project) {
    const replacedUrl = transformString(text),
        res = replacerInternalLinks(replacedUrl, project);
    return textile(res);
}

// --------------------------------------- //



