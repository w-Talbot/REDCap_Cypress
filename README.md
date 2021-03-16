
This Project is originally from :
https://github.com/aldefouw/redcap_cypress


I am adding functionality to it as needed by my institution which may or may not be required by the original owner of this repo.

# all_field_validation.js
 


# Notes
# all_field_validations > line 431: Numbers in Ranges:
 needs to be fixed. Finds 10 instances of 'Number' which includes all other options (inc.   Number(1 decimal place -comma...) etc. ) Fails.


# export_data.js
 Looking into export_data.js not sure which button was intended to be pressed but I assumed it was saverecord and changed it accordingly. Lines 36 and 36.
 