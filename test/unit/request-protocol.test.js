var expect = require('chai').expect,

    Request = require('../..').Request,
    RequestProtocol = require('../..').RequestProtocol;

describe('RequestProtocol', function () {
    it('should be properly initialised from Request', function () {
        var request = new Request({
            url: 'https://postman-echo.com/get'
        });
        expect(request.protocol).to.be.undefined;
    });

    it('should be properly initialised when set from Request constructor', function () {
        var request = new Request({
            protocol: {
                type: 'http'
            }
        });

        expect(request.protocol).to.have.property('type', 'http');
    });

    it('should be able to update the protocol', function () {
        var protocol = new RequestProtocol({
            type: 'http'
        });

        protocol.update({ type: 'websocket' });

        expect(protocol.type).to.eql('websocket');
    });

    it('should not update protocol if type is unknown', function () {
        var protocol = new RequestProtocol({
            type: 'http'
        });

        protocol.update({ type: 'random' });

        expect(protocol.type).to.eql('http');
    });
});
