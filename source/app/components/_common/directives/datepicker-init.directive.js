function DatepickerInitDirective () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link
    };

    function link (scope, element, attrs, ngModelCtrl) {
        const pickadate = element.pickadate({
            format: 'yyyy-m-d'
        });
        const watcher = scope.$watch(attrs.ngModel, (value) => {
            // set initial model value to date picker, only once
            if (value) {
                const picker = pickadate.pickadate('picker');
                picker.set('select', value);
                // cancel the watcher
                watcher();
            }
        });
        ngModelCtrl.$formatters.unshift((modelValue) => {
            if (modelValue) {
                const date = new Date(modelValue);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }
        });
    }
}

DatepickerInitDirective.$inject = [];

export default DatepickerInitDirective;
