class User {
    constructor(id, email, firstname, lastname, avatar) {
        this.id = id;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.avatar = avatar;
    }
}

let users = [];

$(document).ready(function () {

    $(document).ajaxStart(function () {
        $("#wait").fadeIn(500);
    });
    $(document).ajaxComplete(function () {
        $("#wait").fadeOut(500);
    });
    $(document).ajaxError(function(){
        alert("error"); 
    });

    $("button").click(function () {
        let url = "https://reqres.in/api/users";
        $.ajax({
            url: url, success: function (result) {
                // $("#data").html(JSON.stringify(result));
                setTimeout(() => {

                    console.log(result);
                    let data = result.data;

                    data.forEach(u => {
                        users.push(new User(u.id, u.email, u.first_name,
                            u.last_name, u.avatar));
                    });

                    console.log(users);
                    LoadToView(users);
                }, 3300);
            }
        });

        // $.getJSON(url, function (result) {
        //     let allData = result.data;
        //     allData.forEach(u => {
        //         $.each(u, function (i, field) {
        //             $("#data").append(`<b>${name}</b>` + field + "<br>");
        //         });
        //     });
        //     $.getScript("helper.js");
        // });


    });

});

function LoadToView(users) {
    let content = '';
    users.forEach(u => {
        content += `
         <section>
            <img src='${u.avatar}' style='width:200px'/>
            <h1>${u.firstname} - ${u.lastname}</h1>
            <h2>${u.email}</h2>
         </section>
        `;
    });
    $("#data").html(content);
}