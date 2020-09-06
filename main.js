var year = new Date().getFullYear()
var month = new Date().getMonth() < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1
var day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()
var date = year + "-" + month + "-" + day
var url = `https://apiv2.apifootball.com/?action=get_predictions&from=${date}&to=${date}&APIkey=bc797a8b9c96f9819b224cb0f038742d3138e3234b5eb9bdf3def84eae581439`


document.querySelector("button").onclick = () => {
    fetch(url).then(data => data.json()).then(data => {
        recommend(data)
    })

}

fetch(url).then(data => data.json()).then(data => {
    select(data)
})

function select(data) {
    for (let event of data) {
        table(event)

    }

}


function table(data) {
    var row = document.createElement("tr")
    var td = document.createElement("td")
    td.innerHTML = data.country_name + ": " + data.league_name
    row.appendChild(td)
    var td = document.createElement("td")
    td.innerHTML = data.match_hometeam_name
    row.appendChild(td)
    var td = document.createElement("td")
    td.innerHTML = ":"
    row.appendChild(td)
    var td = document.createElement("td")
    td.innerHTML = data.match_awayteam_name
    row.appendChild(td)
    var td = document.createElement("td")
    td.innerHTML = data.prob_HW + "%"
    row.appendChild(td)
    var td = document.createElement("td")
    td.innerHTML = data.prob_D + "%"
    row.appendChild(td)
    var td = document.createElement("td")
    td.innerHTML = data.prob_AW + "% "
    row.appendChild(td)
    document.querySelector("tbody").appendChild(row)
}


function recommend(data) {
    if (document.querySelector(".alert")) {
        document.querySelector(".alert").remove()
    }
    var div = document.createElement("div")
    div.classList.add("alert")
    div.classList.add("table")
    div.classList.add("alert-success")
    div.setAttribute("role", "alert")


    var events = []
    for (let event of data) {
        if ((event.prob_AW > 70 || event.prob_HW > 70) && event.prob_D < 30 && event.prob_O > 60 && event.prob_bts < 50 && event.match_live != 1 && event.match_status != "Finished" && event.match_status != "Postponed") {
            events.push(event)

            if (events.length == 3) {

                for (let event of events) {
                    var row = document.createElement("tr")
                    var winner = event.prob_HW > event.prob_AW ? "HOME WIN" : "AWAY WIN"
                    var td = document.createElement("td")

                    td.innerHTML = event.country_name + ": " + event.league_name
                    row.appendChild(td)
                    var td = document.createElement("td")

                    td.innerHTML = event.match_hometeam_name
                    row.appendChild(td)
                    var td = document.createElement("td")

                    td.innerHTML = ":"
                    row.appendChild(td)
                    var td = document.createElement("td")

                    td.innerHTML = event.match_awayteam_name
                    row.appendChild(td)
                    var td = document.createElement("td")

                    td.innerHTML = winner
                    row.appendChild(td)

                    div.appendChild(row)

                }
                div.style.width = "30rem"
                var button = document.createElement("button")
                button.innerHTML = "OK"
                button.classList.add("btn")
                button.classList.add("btn-primary")

                button.onclick = () => {
                    div.style.display = "none"
                }
                div.appendChild(button)

                document.body.appendChild(div)

                return

            }

        }

    }
    return "nothing for today"


}