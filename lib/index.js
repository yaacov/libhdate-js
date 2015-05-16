/*  libhdate - Hebrew calendar library
 *
 *  Copyright (C) 2015 Yaacov Zamir <kobi.zamir@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hdate = require("./julian");
var HdateHolyday = require("./holyday");
var HdateParasha = require("./parasha");
var HdateSunTime = require("./sun_time");
var HdateStrings = require("./strings");
var Export = (function (_super) {
    __extends(Export, _super);
    function Export() {
        _super.apply(this, arguments);
        this.setGdate = this.set_gdate;
        this.setHdate = this.set_hdate;
        this.setJd = this.set_jd;
        this.getHolyday = HdateHolyday.hdate_get_holyday;
        this.getOmerDay = HdateHolyday.hdate_get_omer_day;
        this.getParasha = HdateParasha.hdate_get_parasha;
        this.getShabbatsParasha = HdateParasha.hdate_get_shabbats_parasha;
        this.getSunTime = HdateSunTime.hdate_get_utc_sun_time_deg;
        this.getSunTimeFull = HdateSunTime.hdate_get_utc_sun_time_full;
        this.getHolydayName = HdateStrings.hdate_get_holyday_name;
        this.getParashaName = HdateStrings.hdate_get_parasha_name;
    }
    return Export;
})(Hdate.Hdate);
module.exports = Export;
