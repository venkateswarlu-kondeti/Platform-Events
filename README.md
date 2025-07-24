Use Case:
---------

Aero Technica Solutions has expanded its offerings with a new service platform where clients can post available drone operating jobs, referred to as “missions.” The company maintains a network of drone pilots who can select and complete these missions. Once the details of a mission are finalized, it's submitted for pilot consideration.

You're tasked with enhancing the mission management process so that clients can easily submit these jobs and drone operators can view and accept them. Clients can judge whether to accept a pilot based on their rating in the system, and you will work to make sure those ratings stay accurate. Finally, each registered pilot has one or more drones linked as assets to their contact record. When pilots sell, lose, or otherwise need to disconnect all the related assets, you will need to develop a Lightning web component to send a toast notification that confirms that the assets were disconnected. 

Business Requirements:
----------------------
-----------------------
Subscribe to Mission Allocation Events:
---------------------------------------

As an integration developer, your focus is on enhancing the existing Submit Mission flow within the mission management system. A flow has already been set up that sets the mission status to 'Pending' once the user submits the mission via the Submit Mission button on the mission record. A resource variable named var_missionNumber is used to pass the mission number into the flow. Your task is to upgrade this flow to effectively manage the distribution of the missions to drone pilots who express interest.

Create an enhancement in the Submit Mission flow so that it automatically resumes when a Mission Allocation platform event is received. This is a crucial step for assigning missions to interested drone pilots. In your solution, the flow should initially pause after the status is set to 'Pending' and resume operation upon detecting the Mission Allocation event message.

This message provides essential details like Mission Number (API Name Mission_Number__c) and the ID of the drone pilot showing interest, Contact Id (API Name Contact_Id__c). Make sure the mission number in the event message is the same as the mission number that is passed into the flow. When the flow resumes, it should update the mission's status to Picked and assign the mission to the correct pilot by updating the Pilot (API Name Pilot__c) field with the received pilot ID.

Test this by running the flow for one of the mission records in the org. Publish a Mission Allocation event message using Apex code, Postman, or the Streaming Monitor tool (already installed in the org). Make sure that the flow resumes correctly and processes the mission number and pilot ID correctly so that the mission status and pilot assignment are updated. You will know you have been successful if the flow consistently resumes operation upon receiving the Mission Allocation event and accurately processes the provided information. Your enhancement should demonstrate the integration of event listening and flow resumption. 

Subscribe to Standard Platform Events:
-------------------------------------

Your next task is to streamline and supervise the operation of Aero Technical Solutions' drone pilot rating system. This system is an important part of how the company's clients decide which pilots to hire, and how its pilots can stay eligible for new assignments. It operates on a weighted rating principle, assessing pilots based on their mission completion rate and overall performance.

The PilotRatingBatch Apex batch job looks at completed missions to evaluate completion rates and safety incidents, and calculate an updated overall rating. This new rating is then added to the existing rate to reflect the pilot's current standing. But here’s the twist: The batch job responsible for these calculations is currently experiencing errors, and the company needs your expertise to log the error into a custom object. Adjust the PilotRatingBatch batch Apex class so that it can publish Standard Platform Event messages with details of errors or exceptions it encounters. 

Note: Our goal here is to make sure all existing errors are caught, so please don't correct the error. Also, there are some existing mission records in the org that you can leverage, or you can create your own that match the criteria.

Then, develop an Apex trigger to capture any errors during the PilotRatingBatch job's execution. This trigger should be on the lookout for any issue, big or small, in the processing of pilot ratings. Store them in a custom object named Error Log. Make sure the Apex job ID is recorded in the Async Apex Job Id (API Name Async_Apex_Job_Id__c) field. This log will act as the central point for monitoring and addressing issues in the pilot rating process.

Test this by running the PilotRatingBatch Apex class and checking to see if the errors are being correctly logged in the Error Log. Also, build unit tests for the Apex trigger to achieve at least 90% code coverage. This is your assurance that the solution is robust and reliable.

Subscribe to Asset Disconnection Events:
---------------------------------------

Your next task involves enhancing the user experience for Aero Technica Solutions' client-facing staff. Your focus will be on the disconnectionNotice Lightning web component on the Contact record page. This component is necessary to indicate the successful disconnection of related assets, such as drones, from a pilot's account. This operation is particularly important when drones are lost, sold, or require disconnection for security reasons. This activity supports the company’s focus on providing optimized drone services and ensures a smooth operational flow, particularly in asset management scenarios.

The Disconnect All button on a contact record initiates the disconnection of related assets. This button launches a flow named Disconnect Assets that invokes an Apex class named DisconnectRelatedAssets. This class updates the status of related assets to Disconnected and publishes an event message detailing the disconnection operation.

Modify the disconnectionNotice Lightning web component to efficiently handle Asset Disconnection event messages. These messages contain vital information like the Asset Identifier (API Name Asset_Identifier__c) and the disconnection status, Disconnected (API Name Disconnected__c, a Boolean indicating true or false).

In your Lightning web component, define a variable channelName to store the Asset Disconnection event channel name. Also, create a function expression named messageCallback to process the payload from the event message. Set the status variable to the Disconnected value from the payload. Execute the showSuccessToast method when Disconnected__c value is true and showErrorToast when Disconnected__c value is false.

It is best practice to unsubscribe to the platform event in the disconnectCallback() method, but we're not checking for it in this challenge.

Test this with a contact record by clicking the Disconnect All button. Ensure that the disconnectionNotice Lightning web component displays appropriate success or error messages for each disconnected asset. This ensures that your modification accurately reflects the disconnection status and accurately manages pilots' drone assets.
