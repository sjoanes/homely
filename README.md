# Homely

API to search and store housing information

## Data Model

Home 

{
	Id: <uuid>,
	sqft: 1000,
	images: [
“https://m.media-amazon.com/images/I/519XvHWeb9S._AC_UY327_FMwebp_QL65_.jpg”,
“https://m.media-amazon.com/images/I/519XvHWeb9S._AC_UY327_FMwebp_QL65_.jpg”,
“https://m.media-amazon.com/images/I/519XvHWeb9S._AC_UY327_FMwebp_QL65_.jpg”,
],
_geoloc: {
  "lat": 40.639751,
  "lng": -73.778925
},
address: “1529 Sunshine Boulevard”,
city: “Toronto”,
Beds: 3,
Baths: 2
}

PurchaseHistory 
{
	home_id: <uuid>,
	askingPrice: 650000,
	soldPrice: 700000,
	startDate: <timestamp>,
	endDate: <timestamp>
}

## APIs
Request GET api/homes?query=location

Response [
	Home,
Home,
]

Request GET api/homes?query=address

Response [
	Home,
Home,
]

Request GET api/homes?query=address

Response [
	Home,
Home,
]

Request GET api/homes?query=address

Response [
	Home,
Home,
]
