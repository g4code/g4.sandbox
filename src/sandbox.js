
import events from './sandbox/events'

export default class Sandbox {
    
    static el (element) {
        return document.querySelector(element)
    }

    static all (element, search) {
        return element.querySelectorAll(search)
    }

    static on (type, selector, callback) {
        return events.on(type, selector, callback)
    }

    static off (type, selector, callback) {
        return events.off(type, selector, callback)
    }

    static clearFormFields (...inputFields) {
        for (let field of inputFields) {
            field.value = ''
        }
    }

    static getFormData (form) {
        return JSON.stringify(Sandbox.getFormFieldsValues(form))
    }

    static getFormFieldsValues (form) {

        if (this.isString(form)) {
            form = this.el(form)
        }

        let formData = new FormData(form)
        let result = {}

        for (let entry of formData) {
            if (entry[0].indexOf('[]') > 0) {
                if(result[entry[0]] == undefined){
                    result[entry[0]] = entry[1]
                }
                else {
                    result[entry[0]] = result[entry[0]].concat('|' + entry[1])
                }
            }
            else {
                result[entry[0]] = entry[1]
            }
        }
        return result
    }

    static createFormData (values) {
        let formData = new FormData()
        for (var key in values) {
            formData.append(key, values[key])
        }
        return formData
    }

    static isString (value) {
        return typeof value === 'string'
    }

    static findChildByClass (element, className) {
        for (var i = 0; i < element.childNodes.length; i++) {
            try{
                if(element.childNodes[i].classList.contains(className)) {
                    return element.childNodes[i]
                }
            }catch(e) {

            }
        }
    }

    static findSiblingByClass (element, className) {
        let siblings = element.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            try{
                if(siblings[i].classList.contains(className)) {
                    return siblings[i]
                }
            }catch(e) {

            }
        }
    }

    static parent (elem, selector) {

        if(selector === undefined){
            return element.parentNode;
        }

        var parentEl = elem.parentNode
        if (parentEl === null) {
            return undefined
        }
        return parentEl.querySelector(selector)
            ? parentEl.querySelector(selector)
            : parents(parentEl, selector)
    }

    static siblings (element, selector) {
        let siblings = [];
        let sibling = element.parentNode.firstChild;
        for (; sibling; sibling = sibling.nextSibling) {
            if (sibling.nodeType !== 1 || sibling === element) {
                continue;
            }
            let className = selector.replace(/\./g, '')
            if(sibling.classList.contains(className)){
                siblings.push(sibling);
            }
        }
        return siblings;
    }
}
