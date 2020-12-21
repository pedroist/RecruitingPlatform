
# SmartRecruiters Postings List App 

<a name="#goal"></a>
## Goal
Develop production-ready application for candidates that displays a list and details of postings published by Smartrecruiters which are available via [SmartRecruiters Public API](#public-api).

<a name="#requirements"></a>
## Requirements
- Angular 6.1.10
- Node 12.9

<a name="#instructions-run"></a>
## Instructions to Run
- git clone https://github.com/pedroist/RecruitingPlatform.git
- cd RecruitingPlatform
- npm install
- npm start (runs ng serve -o –port 8080)

<a name="#instructions-cypress-tests"></a>
## Instructions to run Cypress tests
In another terminal, keeping the server running in the previous terminal, on the root folder of the project:

npx cypress open

Note: assuming you have this a Node>=12 version and cypress installed in your machine.

Here you will find 3 spec files:
    • App_spec.js
    • List_spec.js
    • Details_spec.js
Click on the right top side “Run all specs”, then you should see the tests running.

<a name="#notes"></a>
## Notes about Project
Installed Bootstrap 4.
• Routing Module to have navbar possible to navigate to other pages (just an illustrative extra).
• Changed default CSS to SCSS.
• PostsService makes the HTTP Requests to fetch the data.
• CountriesService and DepartmentsService don’t fetch any data, only keep a BehaviourSubject wich is a Source of the existent countries and departments, respectively. This countries and departments were extracted from the Post list, in order to show only
the ones that are in posts. It made more sense to me, than making an HTTP GET request to get a list of those, which some would not be in any post.
• IPost, ICountry and IDepartment interfaces (model) were used to keep the integrity in the full application. The PostClass implements the IPost interface and is used to map from the fetched data the used properties into an object.
• Used Custom Pipes to filter the array. These pipes receive the filter string which was emited (output) from the FilterPanelComponent to the Posts page and then passed as inputs to PostsListComponent.
• It uses scss to override Bootstrap variables (styles.scss), and some of these variables are used in other scss files.
• The project is also being responsive, the minimum requirements at least, to also look good on a smaller device.
• Along the project, several different types of communication between components were used: Inputs and Outputs (this one with Event Emitters), services with Behaviour Subjects to broadcast variables to the components subscribing them.
• The application is passing the given cypress tests. I could have done other tests but I had not enough time for that, as I mentioned that at the same time of this project I was doing another one.