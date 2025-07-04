#
#   EXECUTE
#

# EXECUTE -> RESET DATABASE
mysql -u root -p < /srv/www/abscissa/scripts/reset.sql

# EXECUTE -> INJECT DATABASE
mysql -u root -p abscissa < /srv/www/abscissa/public/db/database.sql

# EXECUTE -> DATABASE INITIAL STATE
mysql -u root -p abscissa < /srv/www/abscissa/scripts/config.sql