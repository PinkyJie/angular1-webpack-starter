import angular from 'angular';

class ModalService {
    constructor ($compile, $timeout) {
        this.$compile = $compile;
        this.$timeout = $timeout;
    }
    open (title, content, buttons, callback) {
        const modalView = angular.element('<div/>', {
            class: 'modal-view'
        });
        const modalDiv = angular.element('<div/>', {
            id: 'modal',
            class: 'modal'
        });
        modalDiv
            .append(this._buildHeaderAndContent(title, content))
            .append(this._buildFooter(buttons, callback));
        modalView
            .append(modalDiv)
            .appendTo('body');
        this.$timeout(() => {
            $('#modal').openModal({
                dismissible: false
            });
        }, 100);
    }
    _buildHeaderAndContent (title, content) {
        const headerDiv = angular.element('<div/>', {
            class: 'modal-content'
        });
        // title
        const titleDiv = angular.element('<h4/>', {
            text: title
        });
        // content
        const contentDiv = angular.element('<p/>', {
            text: content
        });
        headerDiv.append(titleDiv).append(contentDiv);
        return headerDiv;
    }
    _buildFooter (buttons, callback) {
        const footerDiv = angular.element('<div/>', {
            class: 'modal-footer'
        });
        // ok button
        const okBtn = angular.element('<a/>', {
            class: 'btn modal-action modal-close waves-effect waves-light mr3',
            text: buttons.ok
        });
        okBtn.on('click', () => {
            if (angular.isDefined(callback)) {
                callback(true);
            }
            this._close();
        });
        footerDiv.append(okBtn);
        // cancel button
        if (angular.isDefined(buttons.cancel)) {
            const cancelBtn = angular.element('<a/>', {
                class: 'btn white black-text modal-action modal-close waves-effect waves-light mr2',
                text: buttons.cancel
            });
            footerDiv.append(cancelBtn);
            cancelBtn.on('click', () => {
                if (angular.isDefined(callback)) {
                    callback(false);
                }
                this._close();
            });
        }
        return footerDiv;
    }
    _close () {
        this.$timeout(() => {
            angular.element('.modal-view').remove();
        }, 100);
    }
}

ModalService.$inject = ['$compile', '$timeout'];

export default ModalService;
