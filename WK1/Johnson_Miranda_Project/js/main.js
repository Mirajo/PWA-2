/*  
	Pronizer
	Author: Miranda Johnson
	PWAII
*/

(function($) {

    /*
     ======================== TOOL TIP =====================
     */
    $('.masterTooltip').hover(function(){                                  //tool tip function with hover
        var title = $(this).attr('title');                                 //variable title for this
        $(this).data('tipText', title).removeAttr('title');                //remove attribute from title
        $('<p class="tooltip"></p>')                                       //tool tip class applied to p
            .text(title)                                                   //applied to titles of doc
            .appendTo('body')                                              //append to body of doc
            .fadeIn('slow');                                               //fade tool tip in slow
    }, function() {
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {                                             //functions for mouse
        var mousex = e.pageX + 20;                                         //var for x coordinates of mouse
        var mousey = e.pageY + 10;                                         //var for y coordinates of mouse
        $('.tooltip')                                                      //
        .css({ top: mousey, left: mousex })                                //x & y mouse coordinates for css
    });
	/*
	======================== APPLICATION FUNCTIONS =====================
	*/

	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};

    /*
     ========================= MODAL ========================
     */
    $('.modalClick').on('click', function(event){
        event.preventDefault();                                      //prevent default page use modal
         $('#overlay')                                               //call out the overlay
             .fadeIn()                                               //Fade in the overlay
             .find('#modal')                                         //find the modal
             .fadeIn();                                              //fade in the modal
    });

    $('.close').on('click', function(event){                         //close modal on click
        event.preventDefault();                                      //prevent default page use modal
        $('#overlay')                                                //call out overlay
            .fadeOut()                                               //Fade out overlay
            .find('#modal')                                          //find modal
            .fadeOut();                                              //fade out modal

    });

    /*
     ====================== FADING STATUS OPTION =======================
     */
    $('.status').mouseover(function(){                                //mover over status icons
        $(this).fadeTo(100,.3);                                       //fade icons during mouse over
     });

    $('.status').mouseout(function(){                                 //mouse over status icons
        $(this).fadeTo(100,1);                                        //fade icons during mouse over
     });

    /*
     ====================== TABBED ACCORDION NAVIGATION ====================
     */
    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();


    $('#tabs-nav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();


        $('#tabs-nav .current').removeClass('current');
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs ' + clicked).fadeIn('slow');
    }).eq(0).addClass('current');



	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




