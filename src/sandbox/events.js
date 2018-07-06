export default {

    events: [],

    addedListeners: false,

    doAction (event) {
        var type = event.type
        var target = event.target

        if (event.target.type === 'submit') {
            type = 'submit'
            target = event.target.form
        }

        var handlers = this.events[type]

        if (handlers !== undefined) {
            for (let handler of handlers) {
                if (this.isSameElement(target, handler)) {
                    handler.callback.call(target, event)
                }
            }
        }
    },

    on: function (type, selector, callback) {
        var handler = {
            'type': type,
            'selector': selector,
            'callback': callback
        }

        if (this.events[type] === undefined) {
            this.events[type] = []
        }

        if (this.addedListeners === false) {
            document.querySelector('body').addEventListener('click', this.doAction.bind(this))
            this.addedListeners = true
        }

        this.events[type].push(handler)
    },

    off: function(type, selector, callback) {
        let events = this.events[type]
        if (events !== undefined) {
            this.events[type] = events.filter(singleEvent => singleEvent.selector !== selector)
        }
    },

    isSameElement: function (target, handler) {
        let elements = document.querySelectorAll(handler.selector);
        for(let i in elements){
            if(target === elements[i]){
                return true;
            }
        }
        return false;
    }
}
