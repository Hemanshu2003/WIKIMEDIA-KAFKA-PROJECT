const CLUSTER_BOOTSTRAP_URL = '<---BOOTSTRAP_URL--->';
const CLUSTER_API_KEY = '<---API_KEY--->';
const CLUSTER_API_SECRET = '<---API_SECRET--->';

const CONSUMER_PROPERTIES = {
  'bootstrap.servers': `${CLUSTER_BOOTSTRAP_URL}`,
  'security.protocol': 'SASL_SSL',
  'sasl.mechanisms': 'PLAIN',
  'sasl.username': `${CLUSTER_API_KEY}`,
  'sasl.password': `${CLUSTER_API_SECRET}`,
  'group.id': 'consumer-opensearch',
  'auto.offset.reset': 'earliest',
}


module.exports = {CONSUMER_PROPERTIES};



//  The expected DATA to be fetched and processed!!!
  // {"$schema":"/mediawiki/recentchange/1.0.0","meta":{"uri":"https://www.wikidata.org/wiki/Q87263831","request_id":"bdaafe2a-2491-484b-86f5-c250f4f72c65","id":"4192afcc-4a1b-43a2-acd7-7995d041a90a","dt":"2024-07-14T04:38:56Z","domain":"www.wikidata.org","stream":"mediawiki.recentchange","topic":"eqiad.mediawiki.recentchange","partition":0,"offset":5252169056},"id":2269316348,"type":"edit","namespace":0,"title":"Q87263831","title_url":"https://www.wikidata.org/wiki/Q87263831","comment":"/* wbeditentity-update-languages-short:0||es */ BOT - Adding descriptions (1 languages): es","timestamp":1720931936,"user":"Emijrpbot","bot":true,"notify_url":"https://www.wikidata.org/w/index.php?diff=2203732266&oldid=1824898307&rcid=2269316348","minor":false,"patrolled":true,"length":{"old":24798,"new":24894},"revision":{"old":1824898307,"new":2203732266},"server_url":"https://www.wikidata.org","server_name":"www.wikidata.org","server_script_path":"/w","wiki":"wikidatawiki","parsedcomment":"‎<span dir=\"auto\"><span class=\"autocomment\">Changed label, description and/or aliases in es: </span></span> BOT - Adding descriptions (1 languages): es"}
