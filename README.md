# Vulcan Medication Bundle
> API to get single patient medication bundles.


## Install

Note: No installation is needed to use the web API but ... if you'd like to use the console commands;

`pip install vulcan_medication_bundle`

## How to use

### Web API

We have an Azure app service that can be used to test this API.

The API is available at: http://vulcan-medication-bundle.azurewebsites.net/single_patient_medication_bundle and required 2 URL parameters;
- `api_base` base URL for an "open" FHIR server
- `subject` ID of a patient that should exist on the specified FHIR server

e.g. http://vulcan-medication-bundle.azurewebsites.net/single_patient_medication_bundle?api_base=http://hapi.fhir.org/baseR4&subject=0c4a1143-8d1c-42ed-b509-eac97d77c9b2 will return a medication bundle for subject `0c4a1143-8d1c-42ed-b509-eac97d77c9b2` pulled from `http://hapi.fhir.org/baseR4`

### Console commands

TODO

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

```
SET FLASK_APP=vulcan_medication_bundle.web.app
SET FLASK_ENV=development
flask run
```

The you can GET http://127.0.0.1:5000/single_patient_medication_bundle?api_base=http://hapi.fhir.org/baseR4&subject=0c4a1143-8d1c-42ed-b509-eac97d77c9b2 etc
