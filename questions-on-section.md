#  Questions:
## Location of index.astro
   If in src/pages/app:
    It gives a 404 file not found when first loaded at localhost:4321
    Need to add /app manually => *localhost:4321/app* 
   **If up one level at src/pages it will initally load fine but all of the form actions in POSTS do not work.**
I think this could be fixed by changing all of them from /app/tasks to /pages/app/tasks and all of the other similar POSTS...

   In the github repository it shows it under src/pages/app. 
  
  I did a work around about adding a second index.astro file in src/pages but this somehow does not feel correct.


 ## Need to refresh screen when adding a task or category 




