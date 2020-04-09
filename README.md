## **MOVIE BROWSER**
___
#### **Setup and Installation**
- Run `npm install`    
- Run `cd ios/ pod install cd..`    

#### **Run Applicant**
- `react-native run-ios` to run applicant on ios device or simulator
- `react-native run-android` to run applicant on android device or simulator

#### **packages used**
- `prop-types` I've used this so that it becomes easier for the developer that which props are used and which props are required 
- `lodash` I've used this package basically for debounce feature
- `react-navigation` used this for navigation services.
- `axios` used this for wiring the app with API.

#### **If I had few more hours for this test I would have**
- added refresh controls for the list page
- added env config (react-native-config) for the api keys and urls so that we can secure our key so that if some one want to use our app he should create his own api key
- added pagination

### **Feedback**
This test could have been better if you provide this test during weekends so that developer can spend most of the time developing and testing the app.
API docs https://developers.themoviedb.org/3 keeps loading on my browser becuase of this I was not able to find the api for director and cast in the details page.
