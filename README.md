# Vulcan Medication Bundle
> API to get single patient medication bundles.


## Install

Note: No installation is needed to use the web API but ... if you'd like to use the console commands;

`pip install vulcan_medication_bundle`

## How to use

### Web API

We have an Azure app service that can be used to test this API.

The API is available at: http://vulcan-medication-bundle.azurewebsites.net/single_patient_medication_bundle and requires 2 URL parameters;
- `api_base` base URL for an "open" FHIR server
- `subject` ID of a patient that should exist on the specified FHIR server

e.g. http://vulcan-medication-bundle.azurewebsites.net/single_patient_medication_bundle?api_base=http://hapi.fhir.org/baseR4&subject=0c4a1143-8d1c-42ed-b509-eac97d77c9b2 will return a medication bundle for subject `0c4a1143-8d1c-42ed-b509-eac97d77c9b2` pulled from `http://hapi.fhir.org/baseR4`

### Console commands

For help `single_patient_medication_bundle -h`

To save a bundle to the default output folder `single_patient_medication_bundle https://demo1.aha.accenture.com/fhir/r4 o5BSD5q-Boc-320775`

```
GET https://demo1.aha.accenture.com/fhir/r4/Patient?_id=o5BSD5q-Boc-320775&_format=json
GET https://demo1.aha.accenture.com/fhir/r4/MedicationRequest?subject=Patient/o5BSD5q-Boc-320775&_format=json
GET https://demo1.aha.accenture.com/fhir/r4/MedicationRequest/?subject=Patient/o5BSD5q-Boc-320775&_format=json&$ipp-page-offset=100
...
GET https://demo1.aha.accenture.com/fhir/r4/MedicationDispense?subject=Patient/o5BSD5q-Boc-320775&_format=json
GET https://demo1.aha.accenture.com/fhir/r4/MedicationAdministration?subject=Patient/o5BSD5q-Boc-320775&_format=json
GET https://demo1.aha.accenture.com/fhir/r4/MedicationStatement?subject=Patient/o5BSD5q-Boc-320775&_format=json
GET https://demo1.aha.accenture.com/fhir/r4/Condition?_id=o5BSD5q-Boc-320818&_format=json
...
GET https://demo1.aha.accenture.com/fhir/r4/Condition?_id=o5BSD5q-Boc-320852&_format=json
Removing MedicationRequest with status stopped
...
Removing MedicationRequest with status stopped
Bundle saved to data/patient_medication_bundle_o5BSD5q-Boc-320775.json
```

To save a bundle to a specific folder `vulcan_medication_bundle>single_patient_medication_bundle https://demo1.aha.accenture.com/fhir/r4 o5BSD5q-Boc-320775 --output_path=your_folder`

### Demo Web App

The [demo web app](http://vulcan-medication-bundle.azurewebsites.net) might be running ... sorry if it's not.

# Developers

```
git config --global core.autocrlf input
```

```
conda create -n vulcan_medication_bundle python==3.7 -y
conda activate vulcan_medication_bundle
pip install nbdev jupyterlab pandas Flask
cd github *** nav to where you want this project to live on your filesystem
git clone https://github.com/pete88b/vulcan_medication_bundle.git
cd vulcan_medication_bundle
nbdev_install_git_hooks
jupyter-lab
```

## Running the app locally

To run the web API and demo web app (it's just one Flask app)

```
conda activate vulcan_medication_bundle
SET FLASK_APP=vulcan_medication_bundle.web.app
SET FLASK_ENV=development
flask run
```

The you can GET http://127.0.0.1:5000/single_patient_medication_bundle?api_base=http://hapi.fhir.org/baseR4&subject=0c4a1143-8d1c-42ed-b509-eac97d77c9b2 etc

You'll need to run `nbdev_build_lib` if you make any changes to notebooks tagged with `#default_exp` 

## Running command line tools locally

`pip install -e .` is the only extra step needed
