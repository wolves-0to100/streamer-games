<template>
	<div class="gameContainer">
		<h1>Flaggen Quiz</h1>
		<div v-if="currentCountry" class="game">
			<h2>
				<span>Ländername: </span>
				<span v-if="soulutionsShown">{{ currentCountry.name }} ({{ currentCountry.de }})</span>
				<span v-else>?</span>
			</h2>

			<div class="imageWrapper">
				<img :src="require('~/assets/games/flaggen-quiz/flags/' + currentCountry.code + '.svg')" />
			</div>

			<p>T-00:{{ doubleDigitCountdown }}</p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import tmi from 'tmi.js';

export default {
	name: 'FlaggenQuiz',
	props: {
		isStarted: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			soulutionsShown: false,
			leftCountries: [],
			currentCountry: null,
			countdown: 16,
			interval: null,
			countries: [
				{
					name: 'Afghanistan',
					code: 'af',
					de: 'Afghanistan',
				},
				{
					name: 'Åland Islands',
					code: 'ax',
					de: 'Ålandinseln',
				},
				{
					name: 'Albania',
					code: 'al',
					de: 'Albanien',
				},
				{
					name: 'Algeria',
					code: 'dz',
					de: 'Algerien',
				},
				{
					name: 'American Samoa',
					code: 'as',
					de: 'Amerikanisch-Samoa',
				},
				{
					name: 'Andorra',
					code: 'ad',
					de: 'Andorra',
				},
				{
					name: 'Angola',
					code: 'ao',
					de: 'Angola',
				},
				{
					name: 'Anguilla',
					code: 'ai',
					de: 'Anguilla',
				},
				{
					name: 'Antarctica',
					code: 'aq',
					de: 'Antarktis',
				},
				{
					name: 'Antigua and Barbuda',
					code: 'ag',
					de: 'Antigua und Barbuda',
				},
				{
					name: 'Argentina',
					code: 'ar',
					de: 'Argentinien',
				},
				{
					name: 'Armenia',
					code: 'am',
					de: 'Armenien',
				},
				{
					name: 'Aruba',
					code: 'aw',
					de: 'Aruba',
				},
				{
					name: 'Australia',
					code: 'au',
					de: 'Australien',
				},
				{
					name: 'Austria',
					code: 'at',
					de: 'Österreich',
				},
				{
					name: 'Azerbaijan',
					code: 'az',
					de: 'Aserbaidschan',
				},
				{
					name: 'Bahamas',
					code: 'bs',
					de: 'Bahamas',
				},
				{
					name: 'Bahrain',
					code: 'bh',
					de: 'Bahrain',
				},
				{
					name: 'Bangladesh',
					code: 'bd',
					de: 'Bangladesch',
				},
				{
					name: 'Barbados',
					code: 'bb',
					de: 'Barbados',
				},
				{
					name: 'Belarus',
					code: 'by',
					de: 'Weißrussland',
				},
				{
					name: 'Belgium',
					code: 'be',
					de: 'Belgien',
				},
				{
					name: 'Belize',
					code: 'bz',
					de: 'Belize',
				},
				{
					name: 'Benin',
					code: 'bj',
					de: 'Benin',
				},
				{
					name: 'Bermuda',
					code: 'bm',
					de: 'Bermuda',
				},
				{
					name: 'Bhutan',
					code: 'bt',
					de: 'Bhutan',
				},
				{
					name: 'Bolivia',
					code: 'bo',
					de: 'Bolivien',
				},
				{
					name: 'Bosnia and Herzegovina',
					code: 'ba',
					de: 'Bosnien und Herzegowina',
				},
				{
					name: 'Botswana',
					code: 'bw',
					de: 'Botswana',
				},
				{
					name: 'Bouvet Island',
					code: 'bv',
					de: 'Bouvet Island',
				},
				{
					name: 'Brazil',
					code: 'br',
					de: 'Brasilien',
				},
				{
					name: 'British Indian Ocean Territory',
					code: 'io',
					de: 'Britisches Territorium im Indischen Ozean',
				},
				{
					name: 'Brunei',
					code: 'bn',
					de: 'Brunei',
				},
				{
					name: 'Bulgaria',
					code: 'bg',
					de: 'Bulgarien',
				},
				{
					name: 'Burkina Faso',
					code: 'bf',
					de: 'Burkina Faso',
				},
				{
					name: 'Burundi',
					code: 'bi',
					de: 'Burundi',
				},
				{
					name: 'Cambodia',
					code: 'kh',
					de: 'Kambodscha',
				},
				{
					name: 'Cameroon',
					code: 'cm',
					de: 'Kamerun',
				},
				{
					name: 'Canada',
					code: 'ca',
					de: 'Kanada',
				},
				{
					name: 'Cape Verde',
					code: 'cv',
					de: 'Kap Verde',
				},
				{
					name: 'Caribbean Netherlands',
					code: 'bq',
					de: 'Karibische Niederlande',
				},
				{
					name: 'Cayman Islands',
					code: 'ky',
					de: 'Kaimaninseln',
				},
				{
					name: 'Central African Republic',
					code: 'cf',
					de: 'Zentralafrika Republik',
				},
				{
					name: 'Chad',
					code: 'td',
					de: 'Tschad',
				},
				{
					name: 'Chile',
					code: 'cl',
					de: 'Chile',
				},
				{
					name: 'China',
					code: 'cn',
					de: 'China',
				},
				{
					name: 'Christmas Island',
					code: 'cx',
					de: 'Weihnachtsinsel',
				},
				{
					name: 'Cocos Islands',
					code: 'cc',
					de: 'Kokosinseln',
				},
				{
					name: 'Colombia',
					code: 'co',
					de: 'Kolumbien',
				},
				{
					name: 'Comoros',
					code: 'km',
					de: 'Komoren',
				},
				{
					name: 'Republic of the Congo',
					code: 'cg',
					de: 'Republik Kongo',
				},
				{
					name: 'DR Congo',
					code: 'cd',
					de: 'DR Kongo',
				},
				{
					name: 'Cook Islands',
					code: 'ck',
					de: 'Cookinseln',
				},
				{
					name: 'Costa Rica',
					code: 'cr',
					de: 'Costa Rica',
				},
				{
					name: "Côte d'Ivoire",
					code: 'ci',
					de: 'Elfenbeinküste',
				},
				{
					name: 'Croatia',
					code: 'hr',
					de: 'Kroatien',
				},
				{
					name: 'Cuba',
					code: 'cu',
					de: 'Kuba',
				},
				{
					name: 'Curaçao',
					code: 'cw',
					de: 'Curaçao',
				},
				{
					name: 'Cyprus',
					code: 'cy',
					de: 'Zypern',
				},
				{
					name: 'Czechia',
					code: 'cz',
					de: 'Tschechien',
				},
				{
					name: 'Denmark',
					code: 'dk',
					de: 'Dänemark',
				},
				{
					name: 'Djibouti',
					code: 'dj',
					de: 'Dschibuti ',
				},
				{
					name: 'Dominica',
					code: 'dm',
					de: 'Dominica',
				},
				{
					name: 'Dominican Republic',
					code: 'do',
					de: 'Dominikanische Republik',
				},
				{
					name: 'Ecuador',
					code: 'ec',
					de: 'Ecuador',
				},
				{
					name: 'Egypt',
					code: 'eg',
					de: 'Ägypten',
				},
				{
					name: 'El Salvador',
					code: 'sv',
					de: 'El Salvador',
				},
				{
					name: 'England',
					code: 'gb-eng',
					de: 'England',
				},
				{
					name: 'Equatorial Guinea',
					code: 'gq',
					de: 'Äquatorialguinea',
				},
				{
					name: 'Eritrea',
					code: 'er',
					de: 'Eritrea',
				},
				{
					name: 'Estonia',
					code: 'ee',
					de: 'Estland',
				},
				{
					name: 'Eswatini',
					code: 'sz',
					de: 'Eswatini',
				},
				{
					name: 'Ethiopia',
					code: 'et',
					de: 'Äthiopien',
				},
				{
					name: 'Falkland Islands',
					code: 'fk',
					de: 'Falklandinseln',
				},
				{
					name: 'Faroe Islands',
					code: 'fo',
					de: 'Färöer',
				},
				{
					name: 'Fiji',
					code: 'fj',
					de: 'Fidschi',
				},
				{
					name: 'Finland',
					code: 'fi',
					de: 'Finnland',
				},
				{
					name: 'France',
					code: 'fr',
					de: 'Frankreich',
				},
				{
					name: 'French Guiana',
					code: 'gf',
					de: 'Französisch-Guayana',
				},
				{
					name: 'French Polynesia',
					code: 'pf',
					de: 'Französisch-Polynesien',
				},
				{
					name: 'French Southern and Antarctic Lands',
					code: 'tf',
					de: 'Französisch-Süd- und Antarktis-Länder',
				},
				{
					name: 'Gabon',
					code: 'ga',
					de: 'Gabun',
				},
				{
					name: 'Gambia',
					code: 'gm',
					de: 'Gambia',
				},
				{
					name: 'Georgia',
					code: 'ge',
					de: 'Georgia',
				},
				{
					name: 'Germany',
					code: 'de',
					de: 'Deutschland',
				},
				{
					name: 'Ghana',
					code: 'gh',
					de: 'Ghana',
				},
				{
					name: 'Gibraltar',
					code: 'gi',
					de: 'Gibraltar',
				},
				{
					name: 'Greece',
					code: 'gr',
					de: 'Griechenland',
				},
				{
					name: 'Greenland',
					code: 'gl',
					de: 'Grönland',
				},
				{
					name: 'Grenada',
					code: 'gd',
					de: 'Grenada',
				},
				{
					name: 'Guadeloupe',
					code: 'gp',
					de: 'Guadeloupe',
				},
				{
					name: 'Guam',
					code: 'gu',
					de: 'Guam',
				},
				{
					name: 'Guatemala',
					code: 'gt',
					de: 'Guatemala',
				},
				{
					name: 'Guernsey',
					code: 'gg',
					de: 'Guernsey',
				},
				{
					name: 'Guinea',
					code: 'gn',
					de: 'Guinea',
				},
				{
					name: 'Guinea-Bissau',
					code: 'gw',
					de: 'Guinea-Bissau',
				},
				{
					name: 'Guyana',
					code: 'gy',
					de: 'Guyana',
				},
				{
					name: 'Haiti',
					code: 'ht',
					de: 'Haiti',
				},
				{
					name: 'Heard Island and McDonald Islands',
					code: 'hm',
					de: 'Heard Island und McDonald Islands',
				},
				{
					name: 'Honduras',
					code: 'hn',
					de: 'Honduras',
				},
				{
					name: 'Hong Kong',
					code: 'hk',
					de: 'Hongkong',
				},
				{
					name: 'Hungary',
					code: 'hu',
					de: 'Ungarn',
				},
				{
					name: 'Iceland',
					code: 'is',
					de: 'Island',
				},
				{
					name: 'India',
					code: 'in',
					de: 'Indien',
				},
				{
					name: 'Indonesia',
					code: 'id',
					de: 'Indonesien',
				},
				{
					name: 'Iran',
					code: 'ir',
					de: 'Iran ',
				},
				{
					name: 'Iraq',
					code: 'iq',
					de: 'Irak',
				},
				{
					name: 'Ireland',
					code: 'ie',
					de: 'Irland',
				},
				{
					name: 'Isle of Man',
					code: 'im',
					de: 'Isle of Man',
				},
				{
					name: 'Israel',
					code: 'il',
					de: 'Israel',
				},
				{
					name: 'Italy',
					code: 'it',
					de: 'Italien',
				},
				{
					name: 'Jamaica',
					code: 'jm',
					de: 'Jamaika',
				},
				{
					name: 'Japan',
					code: 'jp',
					de: 'Japan',
				},
				{
					name: 'Jersey',
					code: 'je',
					de: 'Jersey',
				},
				{
					name: 'Jordan',
					code: 'jo',
					de: 'Jordanien',
				},
				{
					name: 'Kazakhstan',
					code: 'kz',
					de: 'Kasachstan',
				},
				{
					name: 'Kenya',
					code: 'ke',
					de: 'Kenia',
				},
				{
					name: 'Kiribati',
					code: 'ki',
					de: 'Kiribati',
				},
				{
					name: 'North Korea',
					code: 'kp',
					de: 'Nordkorea',
				},
				{
					name: 'South Korea',
					code: 'kr',
					de: 'Südkorea',
				},
				{
					name: 'Kosovo',
					code: 'xk',
					de: 'Kosovo',
				},
				{
					name: 'Kuwait',
					code: 'kw',
					de: 'Kuwait',
				},
				{
					name: 'Kyrgyzstan',
					code: 'kg',
					de: 'Kirgisistan',
				},
				{
					name: 'Laos',
					code: 'la',
					de: 'Laos',
				},
				{
					name: 'Latvia',
					code: 'lv',
					de: 'Lettland',
				},
				{
					name: 'Lebanon',
					code: 'lb',
					de: 'Libanon',
				},
				{
					name: 'Lesotho',
					code: 'ls',
					de: 'Lesotho',
				},
				{
					name: 'Liberia',
					code: 'lr',
					de: 'Liberia',
				},
				{
					name: 'Libya',
					code: 'ly',
					de: 'Libyen ',
				},
				{
					name: 'Liechtenstein',
					code: 'li',
					de: 'Liechtenstein',
				},
				{
					name: 'Lithuania',
					code: 'lt',
					de: 'Litauen',
				},
				{
					name: 'Luxembourg',
					code: 'lu',
					de: 'Luxemburg',
				},
				{
					name: 'Macau',
					code: 'mo',
					de: 'Macau',
				},
				{
					name: 'Madagascar',
					code: 'mg',
					de: 'Madagaskar',
				},
				{
					name: 'Malawi',
					code: 'mw',
					de: 'Malawi',
				},
				{
					name: 'Malaysia',
					code: 'my',
					de: 'Malaysia',
				},
				{
					name: 'Maldives',
					code: 'mv',
					de: 'Malediven',
				},
				{
					name: 'Mali',
					code: 'ml',
					de: 'Mali',
				},
				{
					name: 'Malta',
					code: 'mt',
					de: 'Malta',
				},
				{
					name: 'Marshall Islands',
					code: 'mh',
					de: 'Marshallinseln',
				},
				{
					name: 'Martinique',
					code: 'mq',
					de: 'Martinique',
				},
				{
					name: 'Mauritania',
					code: 'mr',
					de: 'Mauretanien',
				},
				{
					name: 'Mauritius',
					code: 'mu',
					de: 'Mauritius',
				},
				{
					name: 'Mayotte',
					code: 'yt',
					de: 'Mayotte',
				},
				{
					name: 'Mexico',
					code: 'mx',
					de: 'Mexiko',
				},
				{
					name: 'Micronesia',
					code: 'fm',
					de: 'Mikronesien',
				},
				{
					name: 'Moldova',
					code: 'md',
					de: 'Moldawien',
				},
				{
					name: 'Monaco',
					code: 'mc',
					de: 'Monaco',
				},
				{
					name: 'Mongolia',
					code: 'mn',
					de: 'Mongolei',
				},
				{
					name: 'Montenegro',
					code: 'me',
					de: 'Montenegro',
				},
				{
					name: 'Montserrat',
					code: 'ms',
					de: 'Montserrat',
				},
				{
					name: 'Morocco',
					code: 'ma',
					de: 'Marokko',
				},
				{
					name: 'Mozambique',
					code: 'mz',
					de: 'Mosambik',
				},
				{
					name: 'Myanmar',
					code: 'mm',
					de: 'Myanmar',
				},
				{
					name: 'Namibia',
					code: 'na',
					de: 'Namibia',
				},
				{
					name: 'Nauru',
					code: 'nr',
					de: 'Nauru',
				},
				{
					name: 'Nepal',
					code: 'np',
					de: 'Nepal',
				},
				{
					name: 'Netherlands',
					code: 'nl',
					de: 'Niederlande',
				},
				{
					name: 'New Caledonia',
					code: 'nc',
					de: 'Neukaledonien',
				},
				{
					name: 'New Zealand',
					code: 'nz',
					de: 'Neuseeland',
				},
				{
					name: 'Nicaragua',
					code: 'ni',
					de: 'Nicaragua',
				},
				{
					name: 'Niger',
					code: 'ne',
					de: 'Niger',
				},
				{
					name: 'Nigeria',
					code: 'ng',
					de: 'Nigeria',
				},
				{
					name: 'Niue',
					code: 'nu',
					de: 'Niue',
				},
				{
					name: 'Norfolk Island',
					code: 'nf',
					de: 'Norfolk Island',
				},
				{
					name: 'North Macedonia',
					code: 'mk',
					de: 'Nordmakedonien',
				},
				{
					name: 'Northern Ireland',
					code: 'gb-nir',
					de: 'Nordirland',
				},
				{
					name: 'Northern Mariana Islands',
					code: 'mp',
					de: 'Nördliche Marianen',
				},
				{
					name: 'Norway',
					code: 'no',
					de: 'Norwegen',
				},
				{
					name: 'Oman',
					code: 'om',
					de: 'Oman',
				},
				{
					name: 'Pakistan',
					code: 'pk',
					de: 'Pakistan',
				},
				{
					name: 'Palau',
					code: 'pw',
					de: 'Palau',
				},
				{
					name: 'Palestine',
					code: 'ps',
					de: 'Palästina',
				},
				{
					name: 'Panama',
					code: 'pa',
					de: 'Panama',
				},
				{
					name: 'Papua New Guinea',
					code: 'pg',
					de: 'Papua Neuguinea',
				},
				{
					name: 'Paraguay',
					code: 'py',
					de: 'Paraguay',
				},
				{
					name: 'Peru',
					code: 'pe',
					de: 'Peru',
				},
				{
					name: 'Philippines',
					code: 'ph',
					de: 'Philippinen',
				},
				{
					name: 'Pitcairn Islands',
					code: 'pn',
					de: 'Pitcairninseln',
				},
				{
					name: 'Poland',
					code: 'pl',
					de: 'Polen',
				},
				{
					name: 'Portugal',
					code: 'pt',
					de: 'Portugal',
				},
				{
					name: 'Puerto Rico',
					code: 'pr',
					de: 'Puerto Rico',
				},
				{
					name: 'Qatar',
					code: 'qa',
					de: 'Katar',
				},
				{
					name: 'Réunion',
					code: 're',
					de: 'Réunion',
				},
				{
					name: 'Romania',
					code: 'ro',
					de: 'Rumänien',
				},
				{
					name: 'Russia',
					code: 'ru',
					de: 'Russland',
				},
				{
					name: 'Rwanda',
					code: 'rw',
					de: 'Ruanda',
				},
				{
					name: 'Saint Barthélemy',
					code: 'bl',
					de: 'St. Barthélemy',
				},
				{
					name: 'Saint Helena',
					code: 'sh',
					de: 'St. Helena',
				},
				{
					name: 'Saint Kitts and Nevis',
					code: 'kn',
					de: 'St. Kitts und Nevis',
				},
				{
					name: 'Saint Lucia',
					code: 'lc',
					de: 'St. Lucia',
				},
				{
					name: 'Saint Martin',
					code: 'mf',
					de: 'St. Martin',
				},
				{
					name: 'Saint Pierre and Miquelon',
					code: 'pm',
					de: 'St. Pierre und Miquelon',
				},
				{
					name: 'Saint Vincent and the Grenadines',
					code: 'vc',
					de: 'St. Vincent und die Grenadinen',
				},
				{
					name: 'Samoa',
					code: 'ws',
					de: 'Samoa',
				},
				{
					name: 'San Marino',
					code: 'sm',
					de: 'San Marino',
				},
				{
					name: 'São Tomé and Príncipe',
					code: 'st',
					de: 'São Tomé und Príncipe ',
				},
				{
					name: 'Saudi Arabia',
					code: 'sa',
					de: 'Saudi-Arabien',
				},
				{
					name: 'Scotland',
					code: 'gb-sct',
					de: 'Schottland',
				},
				{
					name: 'Senegal',
					code: 'sn',
					de: 'Senegal',
				},
				{
					name: 'Serbia',
					code: 'rs',
					de: 'Serbien',
				},
				{
					name: 'Seychelles',
					code: 'sc',
					de: 'Seychellen',
				},
				{
					name: 'Sierra Leone',
					code: 'sl',
					de: 'Sierra Leone',
				},
				{
					name: 'Singapore',
					code: 'sg',
					de: 'Singapur',
				},
				{
					name: 'Sint Maarten',
					code: 'sx',
					de: 'Sint Maarten',
				},
				{
					name: 'Slovakia',
					code: 'sk',
					de: 'Slowakei',
				},
				{
					name: 'Slovenia',
					code: 'si',
					de: 'Slowenien',
				},
				{
					name: 'Solomon Islands',
					code: 'sb',
					de: 'Salomonen',
				},
				{
					name: 'Somalia',
					code: 'so',
					de: 'Somalia',
				},
				{
					name: 'South Africa',
					code: 'za',
					de: 'Südafrika',
				},
				{
					name: 'South Georgia',
					code: 'gs',
					de: 'Südgeorgien',
				},
				{
					name: 'South Sudan',
					code: 'ss',
					de: 'Südsudan',
				},
				{
					name: 'Spain',
					code: 'es',
					de: 'Spanien',
				},
				{
					name: 'Sri Lanka',
					code: 'lk',
					de: 'Sri Lanka',
				},
				{
					name: 'Sudan',
					code: 'sd',
					de: 'Sudan',
				},
				{
					name: 'Suriname',
					code: 'sr',
					de: 'Suriname',
				},
				{
					name: 'Svalbard and Jan Mayen',
					code: 'sj',
					de: 'Spitzbergen und Jan. Mayen',
				},
				{
					name: 'Sweden',
					code: 'se',
					de: 'Schweden',
				},
				{
					name: 'Switzerland',
					code: 'ch',
					de: 'Schweiz',
				},
				{
					name: 'Syria',
					code: 'sy',
					de: 'Syrien',
				},
				{
					name: 'Taiwan',
					code: 'tw',
					de: 'Taiwan',
				},
				{
					name: 'Tajikistan',
					code: 'tj',
					de: 'Tadschikistan',
				},
				{
					name: 'Tanzania',
					code: 'tz',
					de: 'Tansania',
				},
				{
					name: 'Thailand',
					code: 'th',
					de: 'Thailand',
				},
				{
					name: 'Timor-Leste',
					code: 'tl',
					de: 'Timor-Leste',
				},
				{
					name: 'Togo',
					code: 'tg',
					de: 'Togo',
				},
				{
					name: 'Tokelau',
					code: 'tk',
					de: 'Tokelau',
				},
				{
					name: 'Tonga',
					code: 'to',
					de: 'Tonga',
				},
				{
					name: 'Trinidad and Tobago',
					code: 'tt',
					de: 'Trinidad und Tobago',
				},
				{
					name: 'Tunisia',
					code: 'tn',
					de: 'Tunesien',
				},
				{
					name: 'Turkey',
					code: 'tr',
					de: 'Türkei',
				},
				{
					name: 'Turkmenistan',
					code: 'tm',
					de: 'Turkmenistan',
				},
				{
					name: 'Turks and Caicos Islands',
					code: 'tc',
					de: 'Turks- und Caicosinseln',
				},
				{
					name: 'Tuvalu',
					code: 'tv',
					de: 'Tuvalu',
				},
				{
					name: 'Uganda',
					code: 'ug',
					de: 'Uganda',
				},
				{
					name: 'Ukraine',
					code: 'ua',
					de: 'Ukraine',
				},
				{
					name: 'United Arab Emirates',
					code: 'ae',
					de: 'Vereinigte Arabische Emirate ',
				},
				{
					name: 'United Kingdom',
					code: 'gb',
					de: 'Vereinigtes Königreich',
				},
				{
					name: 'United States',
					code: 'us',
					de: 'Vereinigte Staaten',
				},
				{
					name: 'Uruguay',
					code: 'uy',
					de: 'Uruguay',
				},
				{
					name: 'Uzbekistan',
					code: 'uz',
					de: 'Usbekistan',
				},
				{
					name: 'Vanuatu',
					code: 'vu',
					de: 'Vanuatu',
				},
				{
					name: 'Vatican City',
					code: 'va',
					de: 'Vatikanstadt',
				},
				{
					name: 'Venezuela',
					code: 've',
					de: 'Venezuela',
				},
				{
					name: 'Vietnam',
					code: 'vn',
					de: 'Vietnam',
				},
				{
					name: 'British Virgin Islands',
					code: 'vg',
					de: 'Britische Jungferninseln',
				},
				{
					name: 'United States Virgin Islands',
					code: 'vi',
					de: 'Amerikanische Jungferninseln',
				},
				{
					name: 'Wales',
					code: 'gb-wls',
					de: 'Wales',
				},
				{
					name: 'Wallis and Futuna',
					code: 'wf',
					de: 'Wallis und Futuna',
				},
				{
					name: 'Western Sahara',
					code: 'eh',
					de: 'Westsahara',
				},
				{
					name: 'Yemen',
					code: 'ye',
					de: 'Jemen',
				},
				{
					name: 'Zambia',
					code: 'zm',
					de: 'Sambia',
				},
				{
					name: 'Zimbabwe',
					code: 'zw',
					de: 'Simbabwe',
				},
			],
		};
	},
	computed: {
		...mapState(['channelName', 'players']),
		playersByScore() {
			return [...this.players].sort((a, b) => b.score - a.score).slice(0, 6);
		},
		doubleDigitCountdown() {
			return this.countdown.toString().padStart(2, '0');
		},
	},
	watch: {
		isStarted() {
			if (this.isStarted) {
				this.soulutionsShown = false;
				this.currentCountry = this.leftCountries.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
	},
	mounted() {
		this.leftCountries = this.shuffleArray([...this.countries]);
		const client = new tmi.Client({
			connection: {
				secure: true,
				reconnect: true,
			},
			channels: [this.channelName],
		});

		client.connect();

		client.on('message', (channel, tags, message, self) => {
			if (this.interval && !this.soulutionsShown) {
				if (
					message.toLowerCase() === this.currentCountry.name.toLowerCase() ||
					message.toLowerCase() === this.currentCountry.code.toLowerCase() ||
					message.toLowerCase() === this.currentCountry.de.toLowerCase()
				) {
					this.$store.commit('updateScore', {
						username: tags.username,
						points: this.countdown,
					});
				}
			}
		});
	},
	methods: {
		stopCountdown() {
			clearInterval(this.interval);
			this.interval = null;
			if (!this.soulutionsShown) {
				this.soulutionsShown = true;
				this.countdown = 10;
				this.startCountdown();
			} else if (this.isStarted) {
				this.soulutionsShown = false;
				this.currentCountry = this.leftCountries.pop();
				this.countdown = 16;
				this.startCountdown();
			}
		},
		startCountdown() {
			if (!this.channelName) this.$router.push('/');
			this.interval = setInterval(() => {
				this.countdown--;
				if (this.countdown === 0) this.stopCountdown();
			}, 1000);
		},
		shuffleArray(arr) {
			return arr.sort(() => Math.random() - 0.5);
		},
	},
};
</script>

<style lang="scss" scoped>
.gameContainer {
	width: 100%;
}
h1 {
	margin: 0 0 0.8em;
}

.imageWrapper {
	width: 100%;
	margin: 1em 0;
}

img {
	display: block;
	width: 100%;
	max-width: 800px;
}
</style>
