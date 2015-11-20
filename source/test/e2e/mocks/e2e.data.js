// all data used by e2e mock service is here
class MockData {
    constructor () {
        // private
        this.userInfo = {
            name: 'PinkyJie'
        };
        this.userProducts = [
            {
                name: 'phone',
                count: 5,
                icon: 'mdi-hardware-phone-android'
            }
        ];
        this.phones = [
            {
                id: '1',
                model: 'iPhone 6',
                os: 'iOS',
                price: 5288,
                manufacturer: 'Apple',
                size: 4.7,
                releaseDate: _getTimestamp(2014, 10, 9)
            },
            {
                id: '2',
                model: 'iPhone 6 Plus',
                os: 'iOS',
                price: 6088,
                size: 5.5,
                manufacturer: 'Apple',
                releaseDate: _getTimestamp(2014, 10, 9)
            },
            {
                id: '3',
                model: 'Nexus 6',
                os: 'Android',
                price: 4400,
                size: 5.96,
                manufacturer: 'Motorola',
                releaseDate: _getTimestamp(2014, 10, 10)
            },
            {
                id: '4',
                model: 'Galaxy S6',
                os: 'Android',
                price: 5288,
                size: 5.1,
                manufacturer: 'Samsung',
                releaseDate: _getTimestamp(2015, 3, 25)
            },
            {
                id: '5',
                model: 'Mi Note',
                os: 'Android',
                price: 2299,
                size: 5.7,
                manufacturer: 'Xiaomi',
                releaseDate: _getTimestamp(2015, 1, 18)
            }
        ];
    }
}

MockData.$inject = [];

function _getTimestamp (year, month, day) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}

export default MockData;
