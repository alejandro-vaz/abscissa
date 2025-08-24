#!/bin/bash
cd /srv/www/abscissa/server
cp abscissa.cnf /etc/mysql/conf.d/abscissa.cnf
mkdir /run/mysqld
systemctl restart mysql

cp abscissa.conf /etc/nginx/conf.d/abscissa.conf
systemctl restart nginx

cp abscissa.service /etc/systemd/system/abscissa.service
systemctl enable abscissa
systemctl start abscissa

cd /srv/www/abscissa/database
mysql -u root -p < setup.sql