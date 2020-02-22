const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const colors = require('./color.json')
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NjgwMDU4Mjk5NTcxNjM0MjE5.Xk6XvQ.b7XCtwO_LQvyNFFbyFO1_EJDapc';
const PREFIX = '!';


const Seacoin_Manos = 2590;
const MASSCOOK_NOARGS = 'You need to enter `!masscook [# of craft] [%masscook]`\nIE: " !masscook 1000 0.22"\nThis command will calculate total durability needed'
const Imp_Warning = "Try\n `ImpAlchemy 1` (Apprentice) \nOR\n `ImpCooking 2` (Skilled)\n3 \t->\t Prof\n4 \t->\t Art \n5 \t->\t Master\n6 \t->\tGuru"
const Imp_Warning_Level = "```You need to specify Alchemy/Cooking level\n\nImpAlchemy 1  (Apprentice)\nImpAlchemy 2  (Skilled)\n3 \t->\t Prof\n4 \t->\t Art \n5 \t->\t Master\n6 \t->\tGuru```" 
const Mastery_Warning = "Try\n`!mastery alchemy 1000`\nOR\n`!mastery cooking 1000`";


bot.on('ready', ()=>{
    console.log('bot online');
})




bot.login(token);

function listMajors(auth) {



    /**************************ALCHEMY***************************/
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
        range: 'Alchemy!B10:O15',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        var rows = res.data.values;
        
/********************************************************BOT********************************************************* */
  });
  bot.on('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    args[0].toLowerCase();
    switch(args[0]){
        case 'list': case 'command': case 'commands':
          {
              message.channel.send('List of command includes:\n`!mastery\n!mastery alchemy\n!mastery cooking\n!impcooking\n!impalchemy\n!masscook`');
              break;
          }
        case 'masscook':
            if(args[1] == undefined || args[2] == undefined || isNaN(args[2]) || isNaN(args[1]) )
                message.channel.sendMessage(MASSCOOK_NOARGS);
            else{
                var dura = args[1]/(1+9*args[2]);
                message.channel.sendMessage('With ' + args[1] + ' crafts and ' + args[2]*100 + '% to masscook, You need **' + dura.toFixed(0) + '** durability');
            }
                
            break;
        case "alchemyImp": case "imperial": case "imp": case "imperial": case "alchemy": case "cookingImp": case "cooking":
            {
                message.channel.send(Imp_Warning);
                break;
            }

        /****************************************SEA COIN **********************************/ 
        case "seacoin":
        {
          sheets.spreadsheets.values.get({
            spreadsheetId: '1DWPVLb4fAUQA0WRN10yGAtGynzenmG8npsEHApjd3To',
            range: 'Manos!D5:D8',
            }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            var temp_largest_sc = 0;
            rows.map((row) => {
              let temp_row = parseInt(row[0], 10);
              if(temp_row>temp_largest_sc){
                  temp_largest_sc = temp_row; // get largest value
                  }
          });
            if(!args[1]){
              message.channel.send("1 Seacoin = " + Math.round(temp_largest_sc/Seacoin_Manos).toLocaleString() + " silver\n");
              message.channel.send("`Add a number to calc X seacoins. ie: !seacoin 500`");

            }
            else
            {
              if(!isNaN(args[1]))
              {
                message.channel.send(args[1] + " Seacoins = " + Math.round(temp_largest_sc/Seacoin_Manos*args[1]).toLocaleString() + " silver" );
              }
              else{
                message.channel.send("Please use integer");
              }
              
            }
            console.log(temp_largest_sc);
            });

          break;
        }
         /****************************************MASTERY**********************************/ 
        case "mastery":
        {
          if(!args[1] || !args[2]){
            message.channel.send(Mastery_Warning);}
          else{
            args[1].toLocaleLowerCase();
            if(args[1] == 'alchemy' && !isNaN(args[2])){
              sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Mastery!A52:J92',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                console.log("Printing Alchemy Mastery"); //checking data
                /* Code starts here */
                var temp_mastery = args[2]/50; //get cell number according to mastery
                temp_mastery = Math.floor(temp_mastery);
                let sEmbed = new Discord.RichEmbed();
                sEmbed.setColor('#df2660'); //green
                sEmbed.setTitle("At " + args[2] + " Alchemy mastery you have:");

                sEmbed.addField("Avg Elixir per Craft", rows[temp_mastery][8], true);
                sEmbed.addField("\u200B", '\u200B', true); //line break
                sEmbed.addField("Avg Rare per Craft", rows[temp_mastery][9], true);
                sEmbed.addField("Imperial Bonus", rows[temp_mastery][5], true);

                message.channel.send({embed: sEmbed});


                
              });
            }
            else if(args[1] == 'cooking')
            {
              if(!args[1] || !args[2] || isNaN(args[2])){
                message.channel.send(Mastery_Warning);
              }
              else{
                 sheets.spreadsheets.values.get({
                  spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                  range: 'Mastery!A6:K46',
                  }, (err, res) => {
                  if (err) return console.log('The API returned an error: ' + err);
                  const rows = res.data.values;
                  console.log('Major'); // just checking

                  var temp_mastery = args[2]/50;
                  temp_mastery = Math.floor(temp_mastery);
                  let sEmbed = new Discord.RichEmbed();
                  sEmbed.setColor('#33a3ff'); //blue
                  sEmbed.setTitle("At " + args[2] + " Cooking mastery you have:");
                  console.log(rows[20][8] + "testing cooking");
                  sEmbed.addField("Avg Food per Craft", rows[temp_mastery][8], true);
                  sEmbed.addField("\u200B", '\u200B', true); //line break

                  sEmbed.addField("Avg Rare Food per Craft", rows[temp_mastery][9], true);
                  

                  sEmbed.addField("Crafts per Dura (MassCook)", rows[temp_mastery][10], true);
                  sEmbed.addField("\u200B", '\u200B', true); //line break
                  sEmbed.addField("\u200B", '\u200B', true); //line break
                  sEmbed.addField("900 Durability Utensil can finish", parseInt(rows[temp_mastery][10]*900, 10).toFixed(0) + " crafts", true);

                  console.log(rows.values[0]);
                  // Print columns A and E, which correspond to indices 0 and 4.
                  
                  message.channel.send({embed: sEmbed});
                      
                  });
              }
            }
          }
         break;
        }
        case 'impcooking':
        {
        
            if(!args[1])
            {
                message.channel.send(Imp_Warning_Level);
            }
            /*********************************APPRENTICE******************************/
            else if(args[1] == 1 || args[1] == 'apprentice')
            {
                sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Cooking!B10:N25',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Major'); // just checking
                    let sEmbed = new Discord.RichEmbed();
                    sEmbed.setColor('#24993d'); //green
                    sEmbed.setTitle("Apprentice Imperial Profit");
                    //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009866.png');
                    
                    // Print columns A and E, which correspond to indices 0 and 4.
                    var silver_largest = 0;
                    var name_largest = '';
                    rows.map((row) => {
                        let temp_row = parseInt(row[11], 10);
                        if(temp_row>silver_largest){
                            silver_largest = temp_row; // get largest value
                            name_largest = row[0];
                            }
                        console.log(`${row[11]}, ${row[12]}`);
                        sEmbed.addField(row[0], row[11], true);
                    
                    });
                    sEmbed.addField('Most profitable', name_largest , true);
                    message.channel.send({embed: sEmbed});
                    } else {
                    console.log('No data found.');
                    }

                });

                
            }
            /*********************************SKILLED******************************/
            else if(args[1] == 2 || args[1] == 'skilled' || args[1] == 'SKILLED' || args[1] == 'Skilled')
            {
                    
                sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Cooking!B30:N45',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Major'); // just checking
                    let sEmbed = new Discord.RichEmbed();
                    sEmbed.setColor('#33a3ff'); //blue
                    sEmbed.setTitle("Skilled Imperial Profit");
                    //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009867.png');
                    
                    // Print columns A and E, which correspond to indices 0 and 4.
                    var silver_largest = 0;
                    var name_largest = '';
                    rows.map((row) => {
                        let temp_row = parseInt(row[11], 10);
                        if(temp_row>silver_largest){
                            silver_largest = temp_row; // get largest value
                            name_largest = row[0];
                            }
                        console.log(`${row[12]}, ${row[13]}`);
                        sEmbed.addField(row[0], row[11], true);
                    
                    });
                    sEmbed.addField('Most profitable', name_largest, true);
                    message.channel.send({embed: sEmbed});
                    } else {
                    console.log('No data found.');
                    }
                });
                
            }
            /*********************************PROFESSIONAL******************************/
            else if(args[1] == 3 || args[1] == 'professional' || args[1] == 'PROFESSIONAL' || args[1] == 'Professional')
            {
                    
                sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Cooking!B50:N65',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Major'); // just checking
                    let sEmbed = new Discord.RichEmbed();
                    sEmbed.setColor('#e0ff33'); //blue
                    sEmbed.setTitle("Professional Imperial Profit");
                    //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009868.png');
                    
                    // Print columns A and E, which correspond to indices 0 and 4.
                    var silver_largest = 0;
                    var name_largest = '';
                    rows.map((row) => {
                        let temp_row = parseInt(row[11], 10);
                        if(temp_row>silver_largest){
                            silver_largest = temp_row; // get largest value
                            name_largest = row[0];
                            }
                        console.log(`${row[12]}, ${row[13]}`);
                        sEmbed.addField(row[0], row[11], true);
                    
                    });
                    sEmbed.addField('Most profitable', name_largest, true);
                    message.channel.send({embed: sEmbed});
                    } else {
                    console.log('No data found.');
                    }
                });
                
            }
            /*********************************ART******************************/
            else if(args[1] == 4 || args[1] == 'artisan' || args[1] == 'ARTISAN' || args[1] == 'Artisan')
            {
                sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Cooking!B70:N85',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Major'); // just checking
                    let sEmbed = new Discord.RichEmbed();
                    sEmbed.setColor('#ff3344'); //blue
                    sEmbed.setTitle("Artisan Imperial Profit");
                    sEmbed.setTitle('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009869.png');
                    
                    // Print columns A and E, which correspond to indices 0 and 4.
                    var silver_largest = 0;
                    var name_largest = '';
                    rows.map((row) => {
                        let temp_row = parseInt(row[11], 10);
                        if(temp_row>silver_largest){
                            silver_largest = temp_row; // get largest value
                            name_largest = row[0];
                            }
                        console.log(`${row[12]}, ${row[13]}`);
                        sEmbed.addField(row[0], row[11], true);
                    
                    });
                    sEmbed.addField('Most profitable', name_largest, true);
                    message.channel.send({embed: sEmbed});
                    } else {
                    console.log('No data found.');
                    }
                });
                
            }
            /*********************************MASTER******************************/
            else if(args[1] == 5 || args[1] == 'master' || args[1] == 'MASTER' || args[1] == 'Master')
            {
                sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Cooking!B90:N106',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Major'); // just checking
                    let sEmbed = new Discord.RichEmbed();
                    sEmbed.setColor('#9047cd'); //purple
                    sEmbed.setTitle("Master Imperial Profit");
                    sEmbed.setTitle('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009870.png');
                    // Print columns A and E, which correspond to indices 0 and 4.
                    var silver_largest = 0;
                    var name_largest = '';
                    rows.map((row) => {
                        let temp_row = parseInt(row[11], 10);
                        if(temp_row>silver_largest){
                            silver_largest = temp_row; // get largest value
                            name_largest = row[0];
                            }
                        console.log(`${row[12]}, ${row[13]}`);
                        sEmbed.addField(row[0], row[11], true);
                    
                    });
                    sEmbed.addField('Most profitable', name_largest, true);
                    message.channel.send({embed: sEmbed});
                    } else {
                    console.log('No data found.');
                    }
                });
                
            }
            /*********************************GURU******************************/
            else if(args[1] == 6 || args[1] == 'GURU' || args[1] == 'guru' || args[1] == 'Guru')
            {
                sheets.spreadsheets.values.get({
                spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                range: 'Cooking!B111:N123',
                }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                if (rows.length) {
                    console.log('Major'); // just checking
                    let sEmbed = new Discord.RichEmbed();
                    sEmbed.setColor('#cd4747'); //red
                    sEmbed.setTitle("Guru Imperial Profit");
                    //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009871.png');
                    
                    // Print columns A and E, which correspond to indices 0 and 4.
                    var silver_largest = 0;
                    var name_largest = '';
                    rows.map((row) => {
                        let temp_row = parseInt(row[11], 10);
                        if(temp_row>silver_largest){
                            silver_largest = temp_row; // get largest value
                            name_largest = row[0];
                            }
                        console.log(`${row[12]}, ${row[13]}`);
                        sEmbed.addField(row[0], row[11], true);
                    
                    });
                    sEmbed.addField('Most profitable', name_largest, true);
                    message.channel.send({embed: sEmbed});
                    } else {
                    console.log('No data found.');
                    }
                });
                
            }
            
            /*********/
            else{message.channel.send(Imp_Warning_Level);}
            break;
        }
    
    
        case 'impalchemy':
        {
        
            if(!args[1])
            {
                message.channel.send(Imp_Warning_Level);
            }
            /*********************************APPRENTICE******************************/
            else if(args[1] == 1 || args[1] == 'apprentice')
            {
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                    range: 'Alchemy!B10:O15',
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                        console.log('Major'); // just checking
                        let sEmbed = new Discord.RichEmbed();
                        sEmbed.setColor('#24993d'); //green
                        sEmbed.setTitle("Apprentice Imperial Profit");
                        //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009866.png');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        var silver_largest = 0;
                        var name_largest = '';
                        rows.map((row) => {
                            let temp_row = parseInt(row[12], 10);
                            if(temp_row>silver_largest){
                                silver_largest = temp_row; // get largest value
                                name_largest = row[0];
                              }
                          console.log(`${row[12]}, ${row[13]}`);
                          sEmbed.addField(row[0], row[12], true);
                        
                        });
                        sEmbed.addField('Most profitable', name_largest + "\t\t" + silver_largest , true);
                        message.channel.send({embed: sEmbed});
                      } else {
                        console.log('No data found.');
                      }

                });

                
            }
            /*********************************SKILLED******************************/
            else if(args[1] == 2 || args[1] == 'skilled' || args[1] == 'SKILLED' || args[1] == 'Skilled')
            {
                 
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                    range: 'Alchemy!B16:O21',
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                        console.log('Major'); // just checking
                        let sEmbed = new Discord.RichEmbed();
                        sEmbed.setColor('#33a3ff'); //blue
                        sEmbed.setTitle("Skilled Imperial Profit");
                        //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009867.png');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        var silver_largest = 0;
                        var name_largest = '';
                        rows.map((row) => {
                            let temp_row = parseInt(row[12], 10);
                            if(temp_row>silver_largest){
                                silver_largest = temp_row; // get largest value
                                name_largest = row[0];
                              }
                          console.log(`${row[12]}, ${row[13]}`);
                          sEmbed.addField(row[0], row[12], true);
                        
                        });
                        sEmbed.addField('Most profitable', name_largest, true);
                        message.channel.send({embed: sEmbed});
                      } else {
                        console.log('No data found.');
                      }
                  });
                
            }
            /*********************************PROFESSIONAL******************************/
            else if(args[1] == 3 || args[1] == 'professional' || args[1] == 'PROFESSIONAL' || args[1] == 'Professional')
            {
                 
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                    range: 'Alchemy!B22:O28',
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                        console.log('Major'); // just checking
                        let sEmbed = new Discord.RichEmbed();
                        sEmbed.setColor('#e0ff33'); //blue
                        sEmbed.setTitle("Professional Imperial Profit");
                        //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009868.png');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        var silver_largest = 0;
                        var name_largest = '';
                        rows.map((row) => {
                            let temp_row = parseInt(row[12], 10);
                            if(temp_row>silver_largest){
                                silver_largest = temp_row; // get largest value
                                name_largest = row[0];
                              }
                          console.log(`${row[12]}, ${row[13]}`);
                          sEmbed.addField(row[0], row[12], true);
                        
                        });
                        sEmbed.addField('Most profitable', name_largest, true);
                        message.channel.send({embed: sEmbed});
                      } else {
                        console.log('No data found.');
                      }
                  });
                
            }
            /*********************************ART******************************/
            else if(args[1] == 4 || args[1] == 'artisan' || args[1] == 'ARTISAN' || args[1] == 'Artisan')
            {
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                    range: 'Alchemy!B29:O35',
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                        console.log('Major'); // just checking
                        let sEmbed = new Discord.RichEmbed();
                        sEmbed.setColor('#ff3344'); //blue
                        sEmbed.setTitle("Artisan Imperial Profit");
                        //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009869.png');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        var silver_largest = 0;
                        var name_largest = '';
                        rows.map((row) => {
                            let temp_row = parseInt(row[12], 10);
                            if(temp_row>silver_largest){
                                silver_largest = temp_row; // get largest value
                                name_largest = row[0];
                              }
                          console.log(`${row[12]}, ${row[13]}`);
                          sEmbed.addField(row[0], row[12], true);
                        
                        });
                        sEmbed.addField('Most profitable', name_largest, true);
                        message.channel.send({embed: sEmbed});
                      } else {
                        console.log('No data found.');
                      }
                  });
                
            }
            /*********************************MASTER******************************/
            else if(args[1] == 5 || args[1] == 'master' || args[1] == 'MASTER' || args[1] == 'Master')
            {
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                    range: 'Alchemy!B36:O42',
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                        console.log('Major'); // just checking
                        let sEmbed = new Discord.RichEmbed();
                        sEmbed.setColor('#9047cd'); //purple
                        sEmbed.setTitle("Master Imperial Profit");
                        //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009870.png');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        var silver_largest = 0;
                        var name_largest = '';
                        rows.map((row) => {
                            let temp_row = parseInt(row[12], 10);
                            if(temp_row>silver_largest){
                                silver_largest = temp_row; // get largest value
                                name_largest = row[0];
                              }
                          console.log(`${row[12]}, ${row[13]}`);
                          sEmbed.addField(row[0], row[12], true);
                        
                        });
                        sEmbed.addField('Most profitable', name_largest, true);
                        message.channel.send({embed: sEmbed});
                      } else {
                        console.log('No data found.');
                      }
                  });
                
            }
            /*********************************GURU******************************/
            else if(args[1] == 6 || args[1] == 'GURU' || args[1] == 'guru' || args[1] == 'Guru')
            {
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
                    range: 'Alchemy!B43:O48',
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                        console.log('Major'); // just checking
                        let sEmbed = new Discord.RichEmbed();
                        sEmbed.setColor('#cd4747'); //red
                        sEmbed.setTitle("Guru Imperial Profit");
                        //sEmbed.setThumbnail('https://bddatabase.net/items/new_icon/03_etc/07_productmaterial/00009871.png');
                        // Print columns A and E, which correspond to indices 0 and 4.
                        var silver_largest = 0;
                        var name_largest = '';
                        rows.map((row) => {
                            let temp_row = parseInt(row[12], 10);
                            if(temp_row>silver_largest){
                                silver_largest = temp_row; // get largest value
                                name_largest = row[0];
                              }
                          console.log(`${row[12]}, ${row[13]}`);
                          sEmbed.addField(row[0], row[12], true);
                        
                        });
                        sEmbed.addField('Most profitable', name_largest, true);
                        message.channel.send({embed: sEmbed});
                      } else {
                        console.log('No data found.');
                      }
                  });
                
            }
            
            /*********/
            //else{message.channel.send(Imp_Warning_Level);}
            break;
        }
    }
})
 
}

/*

*/
/*function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
    range: 'Alchemy!B10:O15',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
    
      rows.map((row) => {
        console.log(`${row[12]}, ${row[13]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}*/

/*function FindImperialMax(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1tDKdymPEVp0aT4lOgLrzM0lrCtbnkXnnazG2GEjXbrE',
      range: 'Alchemy!B10:O15',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log('Name, Major:');
        message.channel.sendMessage('Elixir\t\tProfits\n');
        message.channel.sendMessage('```');
        // Print columns A and E, which correspond to indices 0 and 4.
        var silver_largest = 0;
        var name_largest = ''
        rows.map((row) => {
            if(row[0]>temp_largest){
                temp_largest = row[12]; // get largest value
                var name = row[0];
              }
              message.channel.sendMessage(row[0] + "\t\t" + row[12]);
          console.log(`${row[12]}, ${row[13]}`);
          message.channel.sendMessage('```');
          message.channel.sendMessage('Most profitable: ' + name_largest);
        });

      } else {
        console.log('No data found.');
      }
    });
  }
*/
