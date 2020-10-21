# DEFINE REDCAP VERSION (FIRST PARAMETER)
redcap_version="$1"

# DEFINE WHETHER TO USE ADVANCED USER INFO (POST REDCAP V10.1.0)
advanced_user_info="$2"

# DEFINE SOURCE PATH WHICH IS PASSED IN FROM cypress.env.json file AS DEFINED by redcap_source_path
source_location="$3"

# DEFINE OTHER LOCATIONS
test_seeds_location="$PWD/test_db"
seeds_location="${test_seeds_location}/seeds"

db_prefix_sql="${test_seeds_location}/structure_prefix.sql"
sql_path="${source_location}/redcap_v${redcap_version}/Resources/sql"
install_sql="${sql_path}/install.sql"
data_sql="${sql_path}/install_data.sql"

# CHOOSE THE PROPER USER INFO SEED
if [ $advanced_user_info = "true" ]
then
      user_sql="${seeds_location}/user_info/advanced.sql"
else
      user_sql="${seeds_location}/user_info/standard.sql"
fi

auth_sql="${seeds_location}/auth.sql"
rights_sql="${seeds_location}/rights.sql"
config_sql="${seeds_location}/config.sql"
projects_sql="${seeds_location}/projects.sql"



#CREATE STRUCTURE FILE
structure_and_data_file="${test_seeds_location}/structure_and_data.sql"
version_substitution="s/REDCAP_VERSION_MAGIC_STRING/${redcap_version}/g"

#REMOVE EXISTING STRUCTURE AND DATA FILE
rm $structure_and_data_file

#CREATE NEW STRUCTURE AND DATA FILE FROM REDCAP SOURCE
cat $db_prefix_sql > $structure_and_data_file
cat $install_sql >> $structure_and_data_file
cat $data_sql >> $structure_and_data_file

cat $user_sql >> $structure_and_data_file
cat $auth_sql >> $structure_and_data_file
cat $rights_sql >> $structure_and_data_file

#DEMO PROJECT SEEDS
for i in 1 2 3 4 5 6 7 8 9 10 11 12
do
	demo_sql="${sql_path}/create_demo_db$i.sql"

	if [ -f "$demo_sql" ]; then
		cat $demo_sql >> $structure_and_data_file
	fi  
done

cat $projects_sql >> $structure_and_data_file

cat $config_sql | sed $version_substitution >> $structure_and_data_file
echo "\nCOMMIT;" >> $structure_and_data_file