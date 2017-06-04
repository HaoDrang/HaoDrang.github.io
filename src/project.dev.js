require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TaskMgr":[function(require,module,exports){
"use strict";
cc._RF.push(module, '22b22P9jyJMN4YmRJCPxpq/', 'TaskMgr');
// script\TaskMgr.js

"use strict";

var instance = null;

module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        _taskList: [],

        taskNode: cc.Node,
        doneNode: cc.Node
    },

    statics: {
        getInst: function getInst() {
            return instance;
        }
    },

    onLoad: function onLoad() {
        // this._taskUI = this.taskNode.getComponent('taskUI');
        // this._doneUI = this.doneNode.getComponent('doneUI');
        instance = this;
    },

    createTask: function createTask(strContent, strTime) {
        var td = new TaskData();
        td.setContent(strContent);
        td.setTime(strTime);

        _taskList.push(td);

        this._taskUI.updateList(this._taskList);
    },

    onTaskConfirm: function onTaskConfirm(strContent, strTime) {
        this.createTask(strContent, strTime);
    }
});

var TaskData = cc.Class({
    properties: {
        timeElapse: 0,
        content: ""
    },

    setTime: function setTime(text) {
        var str = text;
        var hour = 0;
        var minutes = 0;

        var idx = -1;
        if (str.indexOf("h") >= 0) {
            var idx = str.indexOf("h");
        } else if (str.indexOf("H") >= 0) {
            var idx = str.indexOf("H");
        }

        if (idx > -1) {
            hour = parseInt(str.substr(0, idx));
            str = str.substr(idx + 1, str.length - idx);
        }

        if (str.indexOf("m") >= 0) {
            var idx = str.indexOf("m");
        } else if (str.indexOf("M") >= 0) {
            var idx = str.indexOf("M");
        }

        if (idx > -1) {
            minutes = parseInt(str.substr(0, idx));
            str = str.substr(idx + 1, str.length - idx);
        }

        this.timeElapse = (hour * 3600 + minutes * 60) * 1000;
    },

    setContent: function setContent(text) {
        this.content = text;
    }
});

cc._RF.pop();
},{}],"doneUI":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'cf53eHt/YZO4YMG6g3sbYSY', 'doneUI');
// script\doneUI.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RF.pop();
},{}],"taskInput":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4ab4a522ftHrqMJzRGiZvTR', 'taskInput');
// script\taskInput.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentInput: cc.EditBox,
        timeInput: cc.EditBox,

        confirmHandler: [cc.Component.EventHandler]
    },

    onConfirm: function onConfirm() {
        for (var i = 0; i < this.confirmHandler.length; i++) {
            this.confirmHandler[i].emit([this.contentInput.string, this.timeInput.string]);
        }
    }
});

cc._RF.pop();
},{}],"taskUI":[function(require,module,exports){
"use strict";
cc._RF.push(module, '7c14adN9UJJm4OpVRslvuHH', 'taskUI');
// script\taskUI.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    updateList: function updateList() {}
});

cc._RF.pop();
},{}],"timer":[function(require,module,exports){
"use strict";
cc._RF.push(module, '6c14aJatKVF1opJ948+MXCG', 'timer');
// script\timer.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        timeInput: cc.EditBox,
        timerLb: cc.Label,
        pg: cc.ProgressBar
    },

    // use this for initialization
    onLoad: function onLoad() {

        this._run = false;
    },

    onStart: function onStart() {
        this._timeElapse = this._getTimeElapse();

        this._startTime = Date.now();
        this._targetTime = this._startTime + this._timeElapse;

        this._run = true;
    },

    update: function update() {
        if (this._run) {
            var ml = this._targetTime - Date.now();
            var seconds = Math.floor(ml / 1000 % 60);
            var minutes = Math.floor(ml / (1000 * 60) % 60);
            var hours = Math.floor(ml / (1000 * 60 * 60) % 24);

            var outString = hours + ":" + minutes + ":" + seconds;

            this.timerLb.string = outString;

            this.pg.progress = 1 - ml / this._timeElapse;

            if (ml <= 0) {
                this._run = false;
            }
        }
    },

    _getTimeElapse: function _getTimeElapse() {
        var str = this.timeInput.string;

        var hour = 0;
        var minutes = 0;

        var idx = -1;
        if (str.indexOf("h") >= 0) {
            var idx = str.indexOf("h");
        } else if (str.indexOf("H") >= 0) {
            var idx = str.indexOf("H");
        }

        if (idx > -1) {
            hour = parseInt(str.substr(0, idx));
            str = str.substr(idx + 1, str.length - idx);
        }

        if (str.indexOf("m") >= 0) {
            var idx = str.indexOf("m");
        } else if (str.indexOf("M") >= 0) {
            var idx = str.indexOf("M");
        }

        if (idx > -1) {
            minutes = parseInt(str.substr(0, idx));
            str = str.substr(idx + 1, str.length - idx);
        }

        return (hour * 3600 + minutes * 60) * 1000;
    }
});

cc._RF.pop();
},{}]},{},["TaskMgr","doneUI","taskInput","taskUI","timer"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC9UYXNrTWdyLmpzIiwic2NyaXB0L2RvbmVVSS5qcyIsInNjcmlwdC90YXNrSW5wdXQuanMiLCJzY3JpcHQvdGFza1VJLmpzIiwic2NyaXB0L3RpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztBQUVBO0FBQ0k7O0FBRUE7QUFDSTs7QUFFQTtBQUNBO0FBSlE7O0FBT1o7QUFDSTtBQUNJO0FBQ0g7QUFISTs7QUFNVDtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIO0FBbENxQjs7QUFxQzFCO0FBQ0k7QUFDSTtBQUNBO0FBRk87O0FBS1g7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNJO0FBRUg7QUFDRztBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFFSDtBQUNHO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUF6Q21COzs7Ozs7Ozs7O0FDdkN4QjtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWUTs7QUFhWjtBQUNBOztBQWpCSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBOztBQUVBO0FBSlE7O0FBT1o7QUFDSTtBQUNJO0FBQ0g7QUFDSjtBQWRJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVlE7O0FBYVo7QUFDQTs7QUFJQTtBQXJCSzs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFIUTs7QUFNWjtBQUNBOztBQUVJO0FBRUg7O0FBRUQ7QUFDSTs7QUFFQTtBQUNBOztBQUVBO0FBQ0g7O0FBR0Q7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0k7QUFDSDtBQUNKO0FBRUo7O0FBRUQ7QUFDSTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDSTtBQUVIO0FBQ0c7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBRUg7QUFDRztBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0g7QUE5RUkiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaW5zdGFuY2UgPSBudWxsO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF90YXNrTGlzdDpbXSxcclxuXHJcbiAgICAgICAgdGFza05vZGU6Y2MuTm9kZSxcclxuICAgICAgICBkb25lTm9kZTpjYy5Ob2RlXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBnZXRJbnN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIHRoaXMuX3Rhc2tVSSA9IHRoaXMudGFza05vZGUuZ2V0Q29tcG9uZW50KCd0YXNrVUknKTtcclxuICAgICAgICAvLyB0aGlzLl9kb25lVUkgPSB0aGlzLmRvbmVOb2RlLmdldENvbXBvbmVudCgnZG9uZVVJJyk7XHJcbiAgICAgICAgaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVUYXNrOmZ1bmN0aW9uKHN0ckNvbnRlbnQsIHN0clRpbWUpe1xyXG4gICAgICAgIHZhciB0ZCA9IG5ldyBUYXNrRGF0YSgpO1xyXG4gICAgICAgIHRkLnNldENvbnRlbnQoc3RyQ29udGVudCk7XHJcbiAgICAgICAgdGQuc2V0VGltZShzdHJUaW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBfdGFza0xpc3QucHVzaCh0ZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rhc2tVSS51cGRhdGVMaXN0KHRoaXMuX3Rhc2tMaXN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgb25UYXNrQ29uZmlybTpmdW5jdGlvbihzdHJDb250ZW50LHN0clRpbWUpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVGFzayhzdHJDb250ZW50LCBzdHJUaW1lKTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgVGFza0RhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOntcclxuICAgICAgICB0aW1lRWxhcHNlOjAsXHJcbiAgICAgICAgY29udGVudDpcIlwiXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRpbWU6ZnVuY3Rpb24odGV4dCl7XHJcbiAgICAgICAgdmFyIHN0ciA9IHRleHQ7XHJcbiAgICAgICAgdmFyIGhvdXIgPSAwO1xyXG4gICAgICAgIHZhciBtaW51dGVzID0gMDtcclxuXHJcbiAgICAgICAgdmFyIGlkeCA9IC0xO1xyXG4gICAgICAgIGlmKHN0ci5pbmRleE9mKFwiaFwiKSA+PSAwKXtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHN0ci5pbmRleE9mKFwiaFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2UgaWYoc3RyLmluZGV4T2YoXCJIXCIpID49IDApe1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gc3RyLmluZGV4T2YoXCJIXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaWR4ID4gLTEpe1xyXG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQoc3RyLnN1YnN0cigwLCBpZHgpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cihpZHggKyAxLCBzdHIubGVuZ3RoIC0gaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc3RyLmluZGV4T2YoXCJtXCIpID49IDApe1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gc3RyLmluZGV4T2YoXCJtXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZihzdHIuaW5kZXhPZihcIk1cIikgPj0gMCl7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSBzdHIuaW5kZXhPZihcIk1cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpZHggPiAtMSl7XHJcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludChzdHIuc3Vic3RyKDAsIGlkeCkpO1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKGlkeCArIDEsIHN0ci5sZW5ndGggLSBpZHgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50aW1lRWxhcHNlID0gKGhvdXIgKiAzNjAwICsgbWludXRlcyAqIDYwKSAqIDEwMDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldENvbnRlbnQ6ZnVuY3Rpb24odGV4dCl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGV4dDtcclxuICAgIH1cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcclxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAuLi5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNvbnRlbnRJbnB1dDpjYy5FZGl0Qm94LFxyXG4gICAgICAgIHRpbWVJbnB1dDpjYy5FZGl0Qm94LFxyXG5cclxuICAgICAgICBjb25maXJtSGFuZGxlcjpbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl1cclxuICAgIH0sXHJcblxyXG4gICAgb25Db25maXJtOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgdGhpcy5jb25maXJtSGFuZGxlci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlybUhhbmRsZXJbaV0uZW1pdChbdGhpcy5jb250ZW50SW5wdXQuc3RyaW5nLCB0aGlzLnRpbWVJbnB1dC5zdHJpbmddKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVMaXN0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRpbWVJbnB1dDpjYy5FZGl0Qm94LFxyXG4gICAgICAgIHRpbWVyTGI6Y2MuTGFiZWwsXHJcbiAgICAgICAgcGc6Y2MuUHJvZ3Jlc3NCYXJcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fcnVuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIH0sXHJcblxyXG4gICAgb25TdGFydDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuX3RpbWVFbGFwc2UgPSB0aGlzLl9nZXRUaW1lRWxhcHNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0VGltZSA9IHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX3RpbWVFbGFwc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3J1biA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLl9ydW4pe1xyXG4gICAgICAgICAgICB2YXIgbWwgPSB0aGlzLl90YXJnZXRUaW1lIC0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChtbCAvIDEwMDApICUgNjApO1xyXG4gICAgICAgICAgICB2YXIgbWludXRlcyA9TWF0aC5mbG9vcigoKG1sIC8gKDEwMDAqNjApKSAlIDYwKSkgO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgICA9TWF0aC5mbG9vcigoKG1sIC8gKDEwMDAqNjAqNjApKSAlIDI0KSkgO1xyXG5cclxuICAgICAgICAgICAgdmFyIG91dFN0cmluZyA9IGhvdXJzICsgXCI6XCIgKyBtaW51dGVzICsgXCI6XCIgKyBzZWNvbmRzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aW1lckxiLnN0cmluZyA9IG91dFN0cmluZztcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGcucHJvZ3Jlc3MgPSAxIC0gbWwgLyB0aGlzLl90aW1lRWxhcHNlO1xyXG5cclxuICAgICAgICAgICAgaWYobWwgPD0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ydW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRUaW1lRWxhcHNlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHN0ciA9IHRoaXMudGltZUlucHV0LnN0cmluZztcclxuXHJcbiAgICAgICAgdmFyIGhvdXIgPSAwO1xyXG4gICAgICAgIHZhciBtaW51dGVzID0gMDtcclxuXHJcbiAgICAgICAgdmFyIGlkeCA9IC0xO1xyXG4gICAgICAgIGlmKHN0ci5pbmRleE9mKFwiaFwiKSA+PSAwKXtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IHN0ci5pbmRleE9mKFwiaFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2UgaWYoc3RyLmluZGV4T2YoXCJIXCIpID49IDApe1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gc3RyLmluZGV4T2YoXCJIXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaWR4ID4gLTEpe1xyXG4gICAgICAgICAgICBob3VyID0gcGFyc2VJbnQoc3RyLnN1YnN0cigwLCBpZHgpKTtcclxuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cihpZHggKyAxLCBzdHIubGVuZ3RoIC0gaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoc3RyLmluZGV4T2YoXCJtXCIpID49IDApe1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gc3RyLmluZGV4T2YoXCJtXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZihzdHIuaW5kZXhPZihcIk1cIikgPj0gMCl7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSBzdHIuaW5kZXhPZihcIk1cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpZHggPiAtMSl7XHJcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludChzdHIuc3Vic3RyKDAsIGlkeCkpO1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyKGlkeCArIDEsIHN0ci5sZW5ndGggLSBpZHgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChob3VyICogMzYwMCArIG1pbnV0ZXMgKiA2MCkgKiAxMDAwO1xyXG4gICAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==