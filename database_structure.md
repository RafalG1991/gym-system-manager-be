SQL DATABASE STRUCTURE

table 'users'

#	Name                Type	        Collation	          Null	  Default
1	id (Primary)    varchar(36)	    utf8mb4_unicode_ci	  No	    None
2	email	          varchar(320)	  utf8mb4_unicode_ci		No	    None
3	password	      char(60)	      utf8mb4_unicode_ci		No	    None
4	firstname	      varchar(70)	    utf8mb4_unicode_ci		Yes	    NULL
5	lastname	      varchar(120)	  utf8mb4_unicode_ci		Yes	    NULL
6	height	        varchar(3)	    utf8mb4_unicode_ci		Yes	    NULL
7	weight	        varchar(3)	    utf8mb4_unicode_ci		Yes	    NULL
8	memberSince	    timestamp			                        No	    current_timestamp()
9	membershipDate	date			                            Yes	    NULL

table 'classes'
#	Name	            Type	          Collation	          Null	  Default
1	id(Primary)	    varchar(36)	    utf8mb4_unicode_ci		No	    None
2	name	          varchar(50)	    utf8mb4_unicode_ci		No	    None
3	description	    varchar(400)	  utf8mb4_unicode_ci		No	    None
4	starts	        time			                            No	    None
5	ends	          time			                            No	    None
6	day	            tinyint(1)			                      No	    None
