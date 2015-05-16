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
/*
 * Algorithm from http://www.srrb.noaa.gov/highlights/sunrise/calcdetails.html
 * The low accuracy solar position equations are used.
 * These routines are based on Jean Meeus's book Astronomical Algorithms.
 */
/**
 days from 1 january
  
 @param h the Hdate object
 @returns the days from 1 jan
*/
function hdate_get_day_of_year(h) {
    var day, month, year, jd;
    _a = [h.gd_day, h.gd_mon, h.gd_year], day = _a[0], month = _a[1], year = _a[2];
    /* get todays julian day number */
    jd = Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
        Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
        Math.floor((3 * (Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100))) / 4) + day;
    /* substruct the julian day of 1/1/year and add one */
    jd -= (Math.floor((1461 * (year + 4799)) / 4) +
        Math.floor(367 * 11 / 12) -
        Math.floor(Math.floor((3 * ((year + 4899) / 100))) / 4));
    return jd;
    var _a;
}
/**
 utc sun times for altitude at a gregorian date

 Returns the sunset and sunrise times in minutes from 00:00 (utc time)
 if sun altitude in sunrise is deg degries.
 This function only works for altitudes sun realy is.
 If the sun never get to this altitude, the returned sunset and sunrise values
 will be negative. This can happen in low altitude when latitude is
 nearing the pols in winter times, the sun never goes very high in
 the sky there.

 @param h the Hdate object
 @param longitude longitude to use in calculations
 @param latitude latitude to use in calculations
 @param deg degrees of sun's altitude (0 -  Zenith .. 90 - Horizon)
 @returns times array
   sunrise return the utc sunrise in minutes
   sunset return the utc sunset in minutes
*/
function hdate_get_utc_sun_time_deg(h, latitude, longitude, deg) {
    var M_PI = 3.1415926535898;
    var gama = 0; /* location of sun in yearly cycle in radians */
    var eqtime = 0; /* diffference betwen sun noon and clock noon */
    var decl = 0; /* sun declanation */
    var ha = 0; /* solar hour engle */
    var sunrise_angle = M_PI * deg / 180.0; /* sun angle at sunrise/set */
    var day_of_year;
    /* get the day of year */
    day_of_year = hdate_get_day_of_year(h);
    /* get radians of sun orbit around erth =) */
    gama = 2.0 * M_PI * ((day_of_year - 1) / 365.0);
    /* get the diff betwen suns clock and wall clock in minutes */
    eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gama)
        - 0.032077 * Math.sin(gama) - 0.014615 * Math.cos(2.0 * gama)
        - 0.040849 * Math.sin(2.0 * gama));
    /* calculate suns declanation at the equater in radians */
    decl = 0.006918 - 0.399912 * Math.cos(gama) + 0.070257 * Math.sin(gama)
        - 0.006758 * Math.cos(2.0 * gama) + 0.000907 * Math.sin(2.0 * gama)
        - 0.002697 * Math.cos(3.0 * gama) + 0.00148 * Math.sin(3.0 * gama);
    /* we use radians, ratio is 2pi/360 */
    latitude = M_PI * latitude / 180.0;
    /* the sun real time diff from noon at sunset/rise in radians */
    ha = Math.acos(Math.cos(sunrise_angle) / (Math.cos(latitude) * Math.cos(decl)) - Math.tan(latitude) * Math.tan(decl));
    /* we use minutes, ratio is 1440min/2pi */
    ha = 720.0 * ha / M_PI;
    /* get sunset/rise times in utc wall clock in minutes from 00:00 time */
    var sunrise = Math.floor(720.0 - 4.0 * longitude - ha - eqtime);
    var sunset = Math.floor(720.0 - 4.0 * longitude + ha - eqtime);
    return [sunrise, sunset];
}
exports.hdate_get_utc_sun_time_deg = hdate_get_utc_sun_time_deg;
/**
 utc sunrise/set time for a gregorian date
  
 @param h the Hdate object
 @param latitude latitude to use in calculations
 @param longitude longitude to use in calculations
 @returns day time array
   sun_hour return the length of shaa zaminit in minutes
   first_light return the utc alut ha-shachar in minutes
   talit return the utc tphilin and talit in minutes
   sunrise return the utc sunrise in minutes
   midday return the utc midday in minutes
   sunset return the utc sunset in minutes
   first_stars return the utc tzeit hacochavim in minutes
   hree_stars return the utc shlosha cochavim in minutes
*/
function hdate_get_utc_sun_time_full(h, latitude, longitude) {
    var sunrise, sunset, sun_hour, midday, first_light, talit, first_stars, three_stars, none;
    /* sunset and rise time */
    _a = hdate_get_utc_sun_time_deg(h, latitude, longitude, 90.833), sunrise = _a[0], sunset = _a[1];
    /* shaa zmanit by gara, 1/12 of light time */
    sun_hour = Math.floor((sunset - sunrise) / 12);
    midday = Math.floor((sunset + sunrise) / 2);
    /* get times of the different sun angles */
    _b = hdate_get_utc_sun_time_deg(h, latitude, longitude, 106.01), first_light = _b[0], none = _b[1];
    _c = hdate_get_utc_sun_time_deg(h, latitude, longitude, 101.0), talit = _c[0], none = _c[1];
    _d = hdate_get_utc_sun_time_deg(h, latitude, longitude, 96.0), none = _d[0], first_stars = _d[1];
    _e = hdate_get_utc_sun_time_deg(h, latitude, longitude, 98.5), none = _e[0], three_stars = _e[1];
    return [sun_hour, first_light, talit, sunrise, midday, sunset, first_stars, three_stars];
    var _a, _b, _c, _d, _e;
}
exports.hdate_get_utc_sun_time_full = hdate_get_utc_sun_time_full;
