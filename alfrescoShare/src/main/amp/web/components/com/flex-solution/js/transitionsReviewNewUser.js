/**
 * Copyright (C) 2005-2010 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Transitions form component.
 *
 * @namespace Alfresco
 * @class Alfresco.Transitions
 */
(function () {
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event;

    /**
     * Alfresco Slingshot aliases
     */
    var $html = Alfresco.util.encodeHTML;

    /**
     * Transitions constructor.
     *
     * @param {String} htmlId The HTML id of the parent element
     * @return {Alfresco.Transitions} The new Transitions instance
     * @constructor
     */
    Alfresco.Transitions.reviewNewUser = function (htmlId) {
        Alfresco.Transitions.superclass.constructor.call(this, "Alfresco.Transitions.reviewNewUser", htmlId, ["button", "container"]);

        return this;
    };

    YAHOO.extend(Alfresco.Transitions.reviewNewUser, Alfresco.Transitions,
        {

            onClick: function Transitions_onClick(e, p_obj) {

                //listen form validation event
                YAHOO.Bubbling.on("formValidationError", function () {
                    p_obj.set("disabled", false);
                });

                //MNT-2196 fix, disable transition button to prevent multiple execution
                p_obj.set("disabled", true);
                // determine what button was pressed by it's id
                var buttonId = p_obj.get("id");
                var transitionId = buttonId.substring(this.id.length + 1);

                // get the hidden field
                var hiddenField = this._getHiddenField();

                // set the hidden field value
                Dom.setAttribute(hiddenField, "value", transitionId);

                if (Alfresco.logger.isDebugEnabled())
                    Alfresco.logger.debug("Set transitions hidden field to: " + transitionId);

                // attempt to submit the form
                Alfresco.util.submitForm(p_obj.getForm());
            },
        });
})();