DataFornix: Upgrade from Get ocr v1 to Get ocr v2
=================================================

## This documantation shows how to upgrade existing get_ocr_api v1 to get_ocr_api V2 preview.

##### 1 **Explanation of server_name and tenant_name**
  **server_name** Server name is the bases of tenant eniviroment which you are using. The detail is mentioned in tabular format.
  **tenant_name** Tenant name is the bases of which bank or organisation is consuming get ocr apis. The detail is mentioned in tabular format.
  
  **api_token** Api token is random string which is use for tenant authentication.
  
  | Server Name                                     | Tenant Name | Api token                          |
  |-------------------------------------------------|-------------|------------------------------------|
  | {env}.datafornix.com  (Development env)           | {tenant_name}     | {api_token}|
  | {env}.datafornix.com (Production env)         | {tenant_name}     | {api_token} |
  | {env}.datafornix.com (Development env)   | {tenant_name}    | {api_token} |
 

### 2. Document Capture

This api is responsiable for get OCR data of provided documents. 

##### 2.1 **API URL**  
| Get Ocr Api V1                                                                   | Get Ocr Api V2                                                                   |
|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| https://{server_name}.datafornix.com/{tenant_name}/api/v1/asset/get-ocr-results/ | https://{server_name}.datafornix.com/{tenant_name}/api/v2/asset/get-ocr-results/ |


##### 2.2 Api Request( ** application/json **  )


The following improvment with get ocr api version 2:-

````js
1. Get ocr version one only support images. But get ocr api version two support pdf or image both.
2. Get ocr version one  need to send front and back image both in request to get the response. But get ocr version two support combine front and back image base64 string of document together in api request to get the response. 
````

The following changes in request structure:-

````js
You have multiple option to get the ocr response with get ocr api version 2:- 
1. You can send front "images_string" value as base64 string of pdf document. If you send front and back combine pdf base64 string. So you do not need to send anythng with back "image string".
2. You can send "image_string" value as base64 sring of combined front and back image. So you do not need to send anythng with back "image string".
3. You can send front "image_string" as base64 string of pdf document.If you send only front image pdf as base64 string so you need to send back image pdf as base64 string as well.
4. You can send combined front and back pdf or image base64 string in front and back "image string". The api will give the response.
````

Api Request structure of get ocr api V1( ** application/json **  )

````js 
{
    "document_type": 'Identity Card' // Required: or 'Driving Licence', 'Passport', 'Vehicle Registration'
    "reference_number": "reference number here",
    "images": [{
	"image_string": "image base64 string here",
	"authority": "authority string herer",
	"description":"Front" // Use "Back" for back image
    }, {
	...
    }], // Required
    "channel": "web", // optional
}
````

Api Request for get_ocr_v2( ** application/json **  )

````js
1. If you send combine front and back image or pdf document. So you need to send following request structure:-
{
    "document_type": 'Identity Card' // Required: or 'Driving Licence', 'Passport', 'Vehicle Registration'
    "reference_number": "reference number here",
    "images": [{
	"image_string": "image base64 string here/ pdf base64 string",  //Cobmbine front and back image or pdf document base64 string
	"authority": "authority string herer",
	"description":"Front" 
    }], // Required
    "channel": "web", // optional
}

2. If you send separate front and back image or pdf document. So you need to send following request structure:-
{
    "document_type": 'Identity Card' // Required: or 'Driving Licence', 'Passport', 'Vehicle Registration'
    "reference_number": "reference number here",
    "images": [{
	"image_string": "image base64 string here/ pdf base64 string",    //front image or pdf document base64 string
	"authority": "authority string herer",
	"description":"Front"  // Use "Back" for back image
    },{
	...
    }], // Required                                                      //back image or pdf document base64 string 
    "channel": "web", // optional
}


````

##### 2.3  Response ( ** application/json **  )

	 The response structure is same with V1 and V2.
	{
	    "application_error_list": [     
		{
		    "error_code": "",
		    "error_message": ""
		},
		{
		    "error_code": "",
		    "error_message": ""
		}
	    ],
	    "data": {
		"asset_type": "",
		"channel": "web",
		"reference_number": "",
		"type_of_request": "get OCR",
		"properties": {}      // All extracted fields with values come here
	    },
	    "image_feedback": {
		"back_image_resolution": "",
		"is_front_exif_data": "",
		"front_image_orientation": "",
		"front_image_resolution": "",
		"is_back_exif_data": "",
		"back_image_orientation": ""
	    },
	    "image_quality_feedback": ""
	}
	

#### 3  **How to use ocr apis**

	Step-1:- First Use this url to access the create_user_token api:

		https://{Server_Name}.datafornix.com/{tenant_name}/api/v1/create-user-token/


	Step-2:- **Below are the header and request body information:**

		Headers:-

			Token: Token "api_token"      //(It's type is string. You can find it by api documantation point 1)
			Content-Type: application/json


		Request body:-

			{
			"token":"Your_token_name",
			"channel": "web/android/ios",
			"reference_number": "your reference number in character-field format",
			"type_of_request": "async/sync"
			}


		channel:-    Select the channel you want to make the request from. The API supports either web, or android or ios types.
		reference_number:- a character-field type generated at client's end for Datafornix reference purpose
		type_of_request:- whether the request is asynchronous(async) or synchronous(sync)


		Response body
			{
			    "auth_token": "user_authentication_token",
			    "name": "Guest Username",
			    "token": "Request_body token",
			    "channel": "Request_body channel",
			    "reference_number": "Request_body reference_number",
			    "type_of_request": "Request_body type_of_request"
			}

	Step-3:- 

		For example you get auth_token it like that way. You need to use it in get pdf ocr and ocr api for user authentication.
		auth_token:- "WgHAsQvpclZ7CDJUj50CKRo6dWfcqd3j"

	Step-4:- 

		Use this below url to access the get ocr api version one and two and pdf ocr apis:

		a. The GET OCR API version one can be accessed via the following URL:

			https://{server_name}.datafornix.com/{tenant_name}/api/v1/asset/get-ocr-results/

		b. The GET OCR API version two can be accessed via the following URL:

				https://{server_name}.datafornix.com/{tenant_name}/api/v2/asset/get-ocr-results/

		c. The GET pdf OCR API for pdf type document can be accessed via the following URL:

				https://{server_name}.datafornix.com/{tenant_name}/api/v1/asset/get-pdf-ocr/

		Request Header for the above is:

			Token:   Token "api_token" (It's type is string. You can find it by api documantation point 1.0)
			Authorization: bearer "auth_token"(Use auth_token what we get form create_user_token)

		1. If the document has single image like passport. It is the request structure of get ocr api. So the request structure as below:-

			Request Body:
			{
			  "document_type": "",
			  "channel": "web",
			  "reference_number": "123",
			   "images": [
				{
					"authority": "AE",
					"description": "Front",
					"image_string": ""
				}
			]
			}

		2. If the document has front and back both image like identity card. So the request structure as below:-


			Request Body:

			{
			  "document_type": "",
			  "channel": "web",
			  "reference_number": "123",
			   "images": [
				{
					"authority": "AE",
					"description": "Back",
					"image_string": ""
				}
			]
			}


		3. If the document is pdf or image. It is the request structure of get pdf ocr api.So the request structure as below:-

			extraction_mode:realtime
			document_type:"Invoice/Trade Licence"
			reference_number:""
			channel:""
			type_of_request""
			pdf: "Image/PDF"  //"File_object"

	Step-5:- The get ocr api version 1 and version 2 response below:

		{
	    "application_error_list": [     
		{
		    "error_code": "",
		    "error_message": ""
		},
		{
		    "error_code": "",
		    "error_message": ""
		}
	    ],
	    "data": {
		"asset_type": "",
		"channel": "web",
		"reference_number": "",
		"type_of_request": "get OCR",
		"properties": {}      // All extracted fields with values come here
	    },
	    "image_feedback": {
		"back_image_resolution": "",
		"is_front_exif_data": "",
		"front_image_orientation": "",
		"front_image_resolution": "",
		"is_back_exif_data": "",
		"back_image_orientation": ""
	    },
	    "image_quality_feedback": ""
	}

	Step-6:- The pdf ocr api version response below:-

		{
		    "data": {
			"channel": "web",
			"reference_number": "123",
			"properties": {}                  // All extracted fields with values come here
		    },
		    "application_error_list": []
		}
