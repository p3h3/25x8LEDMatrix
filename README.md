# 25x8LEDMatrix
Hopefully a rather pleasant Christmas gift.


###Setup
To upload any custom pictures to the Matrix, you have to use the 
Arduino IDE. Please download that first.

After that you have to start it and go to File -> Preferences.

In there you will have to add the additional Board Manager URL:

    https://github.com/watterott/ATmega328PB-Testing/raw/master/package_m328pb_index.json
    
Now you have to go to Tools -> Board -> Boards Manager
and search for

    atmega328pb boards

You should see one by Watterott electronic - install it.

Now to choose the correct Board you need to go to:
Tools -> Board -> ATmega328PB -> ATmega328PB Internal Clock.

Now set the Speed to 8Mhz and you're done!


###Usage
Use the editor/index.html for guidance on how to use the editor.

When done animating a series of pictures or one lonely sad picture,
copy the code to the main/pictures.h file and go to the
switch statement regarding the variable fc in main/main.ino and
comment out any unwanted picture numbers (use only as many as you
have pasted into pictures.h, otherwise it won't compile!)

Lastly plug in the matrix and upload the code!


###Uploading
If you've done the setup, you should be well prepared.
But even if you are very sure you set everything correctly, double
check it since **it might brick the board if you upload code that
was compiled for another microcontroller**.

If you plug in the Matrix and wait a few seconds it should be recognised
by your operating system as a USB to Serial Converter (COM).
You can check that with the Windows Device Manager if you want.
To upload to the right port, you need to set it under Tools -> Port

Most of the time I open it before pluging in the matrix and after
pluging in by analysing what port is only available after pluging in,
you have a good chance of getting the right port for your matrix.

Now if all your settings are correct, you may be able to compile
and upload the code!