#
#   EXECUTE
#

# EXECUTE -> RESET DATABASE
mysql -u root -p < /srv/www/website/database/reset.sql

# EXECUTE -> INJECT DATABASE
mysql -u root -p abscissa < /srv/www/website/database/database.sql

# EXECUTE -> DATABASE INITIAL STATE
mysql -u root -p abscissa < /srv/www/website/database/config.sql