import { LightningElement } from 'lwc';
import { subscribe, onError, unsubscribe, setDebugFlag, isEmpEnabled } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class DisconnectionNotice extends LightningElement {
    subscription = {};
    status;
    identifier;
    channelName='/event/Asset_Disconnection__e';

    connectedCallback() {
        this.handleSubscribe();        
    }

    renderedCallback(){
        
    }

    handleSubscribe() {
        //Implement your subscribing solution here 
        const messageCallback = (response) => {
            console.log('Message Received : '+JSON.stringify(response));
            this.status=response.data.payload.Disconnected__c;
            this.identifier=response.data.payload.Asset_Identifier__c;
            console.log('status---------->'+JSON.stringify(this.status));
            console.log('identifier---------->'+JSON.stringify(this.identifier));
            if(this.status===true){
                this.showSuccessToast(this.identifier); 
            }else if(this.status===false){
                this.showErrorToast();
            }                        
        }       

        subscribe(this.channelName, -1, messageCallback).then((response)=>{
            this.subscription=response;
        });               
    }

    disconnectedCallback() {
        //Implement your unsubscribing solution here
        unsubscribe(this.subscription);
    }

    showSuccessToast(assetId) {
        console.log('Dispatching Success toast');
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Asset Id '+assetId+' is now disconnected',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    showErrorToast() {
        console.log('Dispatching Error toast');
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Asset was not disconnected. Try Again.',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    
}