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

import Hdate = require("./julian");
import HdateHolyday = require("./holyday");
import HdateParasha = require("./parasha");
import HdateSunTime = require("./sun_time");
import HdateStrings = require("./strings");

class Export extends Hdate.Hdate {
	public setGdate = this.set_gdate;
	public setHdate = this.set_hdate;
	public setJd = this.set_jd;
	public getHolyday = HdateHolyday.hdate_get_holyday;
	public getOmerDay = HdateHolyday.hdate_get_omer_day;
	public getParasha = HdateParasha.hdate_get_parasha;
	public getSunTime = HdateSunTime.hdate_get_utc_sun_time_deg;
	public getSunTimeFull = HdateSunTime.hdate_get_utc_sun_time_full;
	public getHolydayName = HdateStrings.hdate_get_holyday_name;
	public getParashaName = HdateStrings.hdate_get_parasha_name;
}
export = Export;