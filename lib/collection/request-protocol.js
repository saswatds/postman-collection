var _ = require('../util').lodash,
    Property = require('./property').Property,

    RequestProtocol,

    ALLOWED_PROTOCOLS = ['http', 'websocket'];

/**
 * This defines the definition of the protocol to use
 *
 * @typedef RequestProtocol~definition
 * @property {String=} type The Protocol type to use. Check the names in {@link ProtocolTypes}
 *
 * @example <caption>Sample protol definition for HTTP</caption>
 * {
 *   "type": "http",
 *   "version": 1
 * }
 */
_.inherit((

    /**
     * A Postman Protocol definition that comprehensively represents different types of protocol mechanisms available.
     *
     * @constructor
     * @extends {Property}
     *
     * @param {RequestProtocol~definition} options Pass the initial definition of the Protocol..
     *
     * @example <caption>Creating a request with http protocol then change to websocket</caption>
     * var protocol = new RequestProtocol({
     *   type: 'http'
     * });
     *
     * // change the selected protocol
     * protocol.update({type: 'websocket'});
     */
    RequestProtocol = function PostmanRequestProtocol (options) {
        // this constructor is intended to inherit and as such the super constructor is required to be executed
        RequestProtocol.super_.call(this, options);

        if (!options) { return; }


        _.assign(this, /** @lends RequestProtocol */ {
            type: 'http'
        });

        // load all possible protocol parameters from options
        this.update(options);

    }), Property);

_.assign(RequestProtocol.prototype, /** @lends RequestProtocol.prototype */ {
    /**
     * Update the protocol for the request
     *
     * @param {Object} options
     */
    update: function (options) {
        // update must have options
        if (!_.isObject(options)) { return; }

        if (!RequestProtocol.isValidType(options.type)) { return; }

        this.type = options.type;
    }
});

_.assign(RequestProtocol, /** @lends RequestProtocol */ {
    /**
     * Defines the name of this property for internal use.
     * @private
     * @readOnly
     * @type {String}
     */
    _postman_propertyName: 'RequestProtocol',

    /**
     * Determines whether an protocol type name is valid or not
     *
     * @param {String} type
     *
     * @returns {Boolean}
     */
    isValidType: function (type) {
        // The protocol should be part of allowed protocol list
        return _.isString(type) && ALLOWED_PROTOCOLS.includes(type);
    }
});

module.exports = {
    RequestProtocol: RequestProtocol
};
