import { LightningElement,wire,track } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';
export default class BoatSearchForm extends LightningElement {

  @track selectedBoatTypeId = '';
  
  // Private
  @track error = undefined;
  
  @track searchOptions;
  
    // Wire a custom Apex method
    @wire(getBoatTypes)
    boatTypes({ error, data }) {
        // console.log(data);
    if (data) {
      this.searchOptions = data.map(type => {
        // TODO: complete the logic
         return {
             label:type.Name,
             value:type.Id,
         };
      });
      this.searchOptions.unshift({ label: 'All Types', value: 'All Types' });
    } else if (error) {
      this.searchOptions = undefined;
      this.error = error;
    }
    
    console.log(this.searchOptions);
  }
  
  // Fires event that the search option has changed.
  // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
  handleSearchOptionChange(event) {

    event.preventDefault();

    this.selectedBoatTypeId = event.detail.value;

    // Create the const searchEvent

    // searchEvent must be the new custom event search

    const searchEvent = new CustomEvent("search", {

      detail: {

        boatTypeId: this.selectedBoatTypeId

      }

    });

    this.dispatchEvent(searchEvent);
    console.log(this.selectedBoatTypeId);
  }

  
}