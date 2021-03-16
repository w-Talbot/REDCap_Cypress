[![CircleCI](https://circleci.com/gh/aldefouw/redcap_cypress/tree/master.svg?style=svg)](https://circleci.com/gh/aldefouw/redcap_cypress/tree/master)

# all_field_validation.js
 


# Notes
# all_field_validations > line 431: Numbers in Ranges:
 needs to be fixed. Finds 10 instances of 'Number' which includes all other options (inc.   Number(1 decimal place -comma...) etc. ) Fails.

# all_field_validations > line 522: Zipcode(U.S.) in Ranges:
 I don't think there is a Min/Max value for this option? Fails because there isn't, code is fine.