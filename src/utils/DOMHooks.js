export function scrollTo(element, to, duration) {
    if (element.isScrolling || isNaN(duration) || duration < 0) {
        return false;
    }
    const stepTime = 16;
    let difference = to - element.scrollTop;
    let framesAmount = duration / stepTime,
        perTick = difference / framesAmount,
        time = 0;

    element.isScrolling = true;

    let timer = setInterval(function() {
        if (time < duration){
            element.isScrolling = true;
            element.scrollTop = element.scrollTop + perTick;
        } else {
            element.scrollTop = to;
            element.isScrolling = false;
            clearInterval(timer);
        }
        time += stepTime;
    }, stepTime);
}

export function findAuthToken(str) {
    const docFrag = document.createElement('div');
    docFrag.innerHTML = str;
    return docFrag.querySelector('meta[name="csrf-token"]').content;
}

export function findApiKey(str) {
    const docFrag = document.createElement('div');
    docFrag.innerHTML = str;
    return docFrag.querySelector('#api-access-key').textContent;
}

export function findError(str) {
    const docFrag = document.createElement('div');
    let errorMessage = '';

    docFrag.innerHTML = str;

    const errorElem = docFrag.querySelector('#flash_error');

    if (errorElem) {
        errorMessage = errorElem.textContent;
    }

    return errorMessage;
}

export function getParents(el) {
    let parents = [],
        p = el.parentNode;

    while (p !== null && p !== window.document.body) {
        let o = p;
        parents.push(o);
        p = o.parentNode;
    }

    return parents;
}

export function hasClass(elems, classname) {
    let hasClass = false;
    if (elems.length > 0) {
        hasClass = elems.some(function (el, i) {
            return el.classList.contains(classname);
        })
    } else if(elems.classList) {
        hasClass = elems.classList.contains(classname);
    }
    return hasClass;
}