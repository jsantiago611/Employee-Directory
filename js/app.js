$(document).ready(function() {

  $.ajax({
    url: 'https://randomuser.me/api/?results=12&exc=registered,id,nat&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      displayEmployees(data);
      function displayEmployees(data) {
        var photoHTML = '<ul>';
        $.each( data.results, function (i, employee) {
          photoHTML += `<div  class="group border grid" id="employee${i}">`;
            photoHTML += '<li class=" picture">';
              photoHTML += '<div>';
              photoHTML += '<a href="' + employee.picture.medium +'"></a>';
              photoHTML += '<img id="picture group" src="' + employee.picture.medium + '"></a></li>';
                photoHTML += '<div class="text">';
                photoHTML += '<h5 id="name" class="bottom-space">' + employee.name.first + ' ' + employee.name.last + '</h5>';
                photoHTML += '<p>' + employee.email + '</p>';
                photoHTML += '<p class="capital">' + employee.location.city + '</p>';
                photoHTML += '<p class="hidden">' + employee.login.username + ' </p>';
                photoHTML += '</div>';
                photoHTML += '</div>';
              photoHTML += '</div>';
              photoHTML += '</li>';
            photoHTML += '</div>';
        }); //break loop
        photoHTML += '</ul>'; //end HTML list

        $('#employee').html(photoHTML); //Add new HTML to page

        ///////////////////////
        //search function
        let $searchBar = $('.search');
        var $searchText = $("input").val();
        $employeeName = $("#name").val();
        //when user clicks search bar and lifts key...
        $($searchBar).keyup(function() {

          //loop through all li elementss
          $('li').each(function (i) {
            //if search input (value) matches an employee name (text),
            let $name = $("h5").eq(i).text();
            let $username = $(".hidden").eq(i).text();
            let $searchValue = $("input").val().toLowerCase();

            if ($name.includes($searchValue)) {
              $(this).next().show();
              $(this).prev().show();
              $(this).show();
              $(this).parent().show();
            }
            else {
              $(this).next().hide();
              $(this).prev().hide();
              $(this).hide();
              $(this).parent().hide();
            }
            if ($username.includes($searchValue)) {
              $(this).next().show();
              $(this).prev().show();
              $(this).show();
              $(this).parent().show();
            }
            if ($searchValue === "") {
              $("input:text").attr('placeholder', "Try another name..." );
              $(this).next().show();
              $(this).prev().show();
              $(this).show();
              $(this).parent().show();
            }
          })})

          //////////////////////////////

        function modals() {

          function modalTemplate(i) {

             $(`<div class="modal fade" tabindex="${i}" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div>
                  <a href="' + employee.picture.medium +'"></a>
                  <img src=${ data.results[i].picture.large }></li>
                  <h5 class="modal-title" id="exampleModalLabel">${ data.results[i].name.first + " " + data.results[i].name.last }</h5>
                  <p>${ data.results[i].email }</p>
                  <p class="capital">${ data.results[i].location.city }</p>
                </div>
                <div class="modal-body">
                <hr />
                </div>
                <div class="div-bottom-space">
                  <p class="bottom-space">${ data.results[i].login.username }</p>
                  <p class="bottom-space">${ data.results[i].phone }</p>
                  <p class="capital bottom-space">${ data.results[i].location.street },  ${ data.results[i].location.city } ${ data.results[i].location.postcode }</p>
                  <p class="bottom-space">Birthday: ${ data.results[i].dob.slice(5,7) }/${ data.results[i].dob.slice(8,10) }/${ data.results[i].dob.slice(2,4) }</p>

                </div>
                <div class="modal-footer">
                  <button type="button" id="prev" class="btn btn-secondary prev" data-dismiss="modal" data-toggle="modal" aria-labelledby="ModalWindow" data-target="#modal${i}" >Prev</button>
                  <button type="button" id="next" class="btn btn-secondary next" data-target="#modal${i + 1}" >Next</button>
                </div>
              </div>
            </div>
          </div>`).modal(focus);
        }


          $('li').each(function (i) {
          //modal popup for employee 1
          $(`#employee${i}`).click(function() {
            modalTemplate(i);

            //When user clicks "next"
            $('body').on('click', '#next', function (e) {//still in a loop
              $('.modal-backdrop').remove();
              $(this).parent().parent().parent().parent().hide("80000");
              modalTemplate(`${i += 1}`);
            });
            //When user clicks "prev"
            $('body').on('click', '#prev', function () {//still in a loop
              $('.modal-backdrop').remove();
              $(this).parent().parent().parent().parent().hide("fast");
              modalTemplate(`${i -= 1}`);
            });

            $('body').on("mouseover", "#modal0", function() {
              $("body #prev").hide();
            }) //hide 'prev' button on first modal
            $('body').on("mouseover", "#modal11", function() {
              $("body #next").hide();
            }) //hide 'prev' button on first modal
            }) //click event done

        }) //loop done
      } //modals function done
    modals();
      }
    } //AJAX success func done
  });//data pull done
}); //end ready
