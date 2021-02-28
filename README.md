# basic-upload

Different techniques for image upload are being used in these different branches.

Note: MongoDB is used in every case since otherwise filenames cannot be retrieved: 

> The choice to keep the original file name differs from use case to use case. In either case you will have to store the name somewhere in a persistence medium (like a database) so that while displaying it back you can look into your uploads directory and send the file back. 

* Branch 1: local-storage-with-mongodb