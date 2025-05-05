"use client";

import { useId, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomTooltipContent } from "@/components/account/tooltip";
// import { Badge } from "../ui/badge";

const hourlyData = [
  { date: "2025-03-12", time: "3:00 PM", actual: 1181008, projected: 1200000 },
  { date: "2025-03-12", time: "4:00 PM", actual: 1182003, projected: 1178000 },
  { date: "2025-03-12", time: "5:00 PM", actual: 1182007, projected: 1195000 },
  { date: "2025-03-12", time: "6:00 PM", actual: 1184000, projected: 1189000 },
  { date: "2025-03-12", time: "7:00 PM", actual: 1183003, projected: 1179000 },
  { date: "2025-03-12", time: "8:00 PM", actual: 1183005, projected: 1180000 },
  { date: "2025-03-12", time: "9:00 PM", actual: 1185001, projected: 1181000 },
  { date: "2025-03-12", time: "10:00 PM", actual: 1188007, projected: 1182000 },
  { date: "2025-03-12", time: "11:00 PM", actual: 1184000, projected: 1183000 },
  { date: "2025-03-13", time: "12:00 AM", actual: 1186002, projected: 1184000 },
  { date: "2025-03-13", time: "1:00 AM", actual: 1182005, projected: 1185000 },
  { date: "2025-03-13", time: "2:00 AM", actual: 1178005, projected: 1186000 },
  { date: "2025-03-13", time: "3:00 AM", actual: 1174005, projected: 1187000 },
  { date: "2025-03-13", time: "4:00 AM", actual: 1176005, projected: 1188000 },
  { date: "2025-03-13", time: "5:00 AM", actual: 1173008, projected: 1189000 },
  { date: "2025-03-13", time: "6:00 AM", actual: 1174005, projected: 1190000 },
  { date: "2025-03-13", time: "7:00 AM", actual: 1174000, projected: 1191000 },
  { date: "2025-03-13", time: "8:00 AM", actual: 1174006, projected: 1192000 },
  { date: "2025-03-13", time: "9:00 AM", actual: 1175004, projected: 1193000 },
  { date: "2025-03-13", time: "10:00 AM", actual: 1175008, projected: 1194000 },
  { date: "2025-03-13", time: "11:00 AM", actual: 1175005, projected: 1195000 },
  { date: "2025-03-13", time: "12:00 PM", actual: 1173100, projected: 1196000 },
  { date: "2025-03-13", time: "1:00 PM", actual: 1172700, projected: 1197000 },
  { date: "2025-03-13", time: "2:00 PM", actual: 1171600, projected: 1198000 },
  { date: "2025-03-13", time: "3:00 PM", actual: 1172600, projected: 1199000 },
  { date: "2025-03-13", time: "4:00 PM", actual: 1174000, projected: 1200000 },
  { date: "2025-03-13", time: "5:00 PM", actual: 1173800, projected: 1201000 },
  { date: "2025-03-13", time: "6:00 PM", actual: 1175500, projected: 1202000 },
  { date: "2025-03-13", time: "7:00 PM", actual: 1176000, projected: 1203000 },
  { date: "2025-03-13", time: "8:00 PM", actual: 1168100, projected: 1194000 },
  { date: "2025-03-13", time: "9:00 PM", actual: 1170400, projected: 1195000 },
  { date: "2025-03-13", time: "10:00 PM", actual: 1171000, projected: 1196000 },
  { date: "2025-03-13", time: "11:00 PM", actual: 1174900, projected: 1197000 },
  { date: "2025-03-14", time: "12:00 AM", actual: 1174200, projected: 1198000 },
  { date: "2025-03-14", time: "1:00 AM", actual: 1174000, projected: 1199000 },
  { date: "2025-03-14", time: "2:00 AM", actual: 1176000, projected: 1200000 },
  { date: "2025-03-14", time: "3:00 AM", actual: 1175500, projected: 1201000 },
  { date: "2025-03-14", time: "4:00 AM", actual: 1175800, projected: 1202000 },
  { date: "2025-03-14", time: "5:00 AM", actual: 1175400, projected: 1203000 },
  { date: "2025-03-14", time: "6:00 AM", actual: 1174000, projected: 1204000 },
  { date: "2025-03-14", time: "7:00 AM", actual: 1174500, projected: 1205000 },
  { date: "2025-03-14", time: "8:00 AM", actual: 1173800, projected: 1206000 },
  { date: "2025-03-14", time: "9:00 AM", actual: 1176500, projected: 1207000 },
  { date: "2025-03-14", time: "10:00 AM", actual: 1174500, projected: 1208000 },
  { date: "2025-03-14", time: "11:00 AM", actual: 1178500, projected: 1209000 },
  { date: "2025-03-14", time: "12:00 PM", actual: 1182500, projected: 1210000 },
  { date: "2025-03-14", time: "1:00 PM", actual: 1186200, projected: 1211000 },
  { date: "2025-03-14", time: "2:00 PM", actual: 1184000, projected: 1212000 },
  { date: "2025-03-14", time: "3:00 PM", actual: 1188700, projected: 1213000 },
  { date: "2025-03-14", time: "4:00 PM", actual: 1185100, projected: 1214000 },
  { date: "2025-03-14", time: "5:00 PM", actual: 1183500, projected: 1215000 },
  { date: "2025-03-14", time: "6:00 PM", actual: 1183300, projected: 1216000 },
  { date: "2025-03-14", time: "7:00 PM", actual: 1184000, projected: 1217000 },
  { date: "2025-03-14", time: "8:00 PM", actual: 1182700, projected: 1218000 },
  { date: "2025-03-14", time: "9:00 PM", actual: 1182300, projected: 1219000 },
  { date: "2025-03-14", time: "10:00 PM", actual: 1181800, projected: 1220000 },
  { date: "2025-03-14", time: "11:00 PM", actual: 1184000, projected: 1221000 },
  { date: "2025-03-15", time: "12:00 AM", actual: 1181700, projected: 1222000 },
  { date: "2025-03-15", time: "1:00 AM", actual: 1180800, projected: 1223000 },
  { date: "2025-03-15", time: "2:00 AM", actual: 1177400, projected: 1224000 },
  { date: "2025-03-15", time: "3:00 AM", actual: 1177800, projected: 1225000 },
  { date: "2025-03-15", time: "4:00 AM", actual: 1180500, projected: 1226000 },
  { date: "2025-03-15", time: "5:00 AM", actual: 1181200, projected: 1227000 },
  { date: "2025-03-15", time: "6:00 AM", actual: 1180100, projected: 1228000 },
  { date: "2025-03-15", time: "7:00 AM", actual: 1183800, projected: 1229000 },
  { date: "2025-03-15", time: "8:00 AM", actual: 1183100, projected: 1230000 },
  { date: "2025-03-15", time: "9:00 AM", actual: 1182500, projected: 1231000 },
  { date: "2025-03-15", time: "10:00 AM", actual: 1186300, projected: 1232000 },
  { date: "2025-03-15", time: "11:00 AM", actual: 1188300, projected: 1233000 },
  { date: "2025-03-15", time: "12:00 PM", actual: 1191000, projected: 1234000 },
  { date: "2025-03-15", time: "1:00 PM", actual: 1190200, projected: 1235000 },
  { date: "2025-03-15", time: "2:00 PM", actual: 1190300, projected: 1236000 },
  { date: "2025-03-15", time: "3:00 PM", actual: 1189200, projected: 1237000 },
  { date: "2025-03-15", time: "4:00 PM", actual: 1187900, projected: 1238000 },
  { date: "2025-03-15", time: "5:00 PM", actual: 1186600, projected: 1239000 },
  { date: "2025-03-15", time: "6:00 PM", actual: 1187600, projected: 1240000 },
  { date: "2025-03-15", time: "7:00 PM", actual: 1189200, projected: 1241000 },
  { date: "2025-03-15", time: "8:00 PM", actual: 1190700, projected: 1242000 },
  { date: "2025-03-15", time: "9:00 PM", actual: 1184800, projected: 1243000 },
  { date: "2025-03-15", time: "10:00 PM", actual: 1183900, projected: 1244000 },
  { date: "2025-03-15", time: "11:00 PM", actual: 1188600, projected: 1245000 },
  { date: "2025-03-16", time: "12:00 AM", actual: 1186800, projected: 1246000 },
  { date: "2025-03-16", time: "1:00 AM", actual: 1187600, projected: 1247000 },
  { date: "2025-03-16", time: "2:00 AM", actual: 1180500, projected: 1248000 },
  { date: "2025-03-16", time: "3:00 AM", actual: 1172200, projected: 1249000 },
  { date: "2025-03-16", time: "4:00 AM", actual: 1176700, projected: 1250000 },
  { date: "2025-03-16", time: "5:00 AM", actual: 1176000, projected: 1251000 },
  { date: "2025-03-16", time: "6:00 AM", actual: 1176100, projected: 1252000 },
  { date: "2025-03-16", time: "7:00 AM", actual: 1177500, projected: 1253000 },
  { date: "2025-03-16", time: "8:00 AM", actual: 1179900, projected: 1254000 },
  { date: "2025-03-16", time: "9:00 AM", actual: 1177800, projected: 1255000 },
  { date: "2025-03-16", time: "10:00 AM", actual: 1177000, projected: 1256000 },
  { date: "2025-03-16", time: "11:00 AM", actual: 1174900, projected: 1257000 },
  { date: "2025-03-16", time: "12:00 PM", actual: 1181500, projected: 1258000 },
  { date: "2025-03-16", time: "1:00 PM", actual: 1182300, projected: 1259000 },
  { date: "2025-03-16", time: "2:00 PM", actual: 1181900, projected: 1260000 },
  { date: "2025-03-16", time: "3:00 PM", actual: 1181100, projected: 1261000 },
  { date: "2025-03-16", time: "4:00 PM", actual: 1183900, projected: 1262000 },
  { date: "2025-03-16", time: "5:00 PM", actual: 1188100, projected: 1263000 },
  { date: "2025-03-16", time: "6:00 PM", actual: 1189900, projected: 1264000 },
  { date: "2025-03-16", time: "7:00 PM", actual: 1181500, projected: 1265000 },
  { date: "2025-03-16", time: "8:00 PM", actual: 1185700, projected: 1266000 },
  { date: "2025-03-16", time: "9:00 PM", actual: 1186300, projected: 1267000 },
  { date: "2025-03-16", time: "10:00 PM", actual: 1188700, projected: 1268000 },
  { date: "2025-03-16", time: "11:00 PM", actual: 1188600, projected: 1269000 },
  { date: "2025-03-17", time: "12:00 AM", actual: 1187400, projected: 1270000 },
  { date: "2025-03-17", time: "1:00 AM", actual: 1187600, projected: 1271000 },
  { date: "2025-03-17", time: "2:00 AM", actual: 1187600, projected: 1272000 },
  { date: "2025-03-17", time: "3:00 AM", actual: 1186300, projected: 1273000 },
  { date: "2025-03-17", time: "4:00 AM", actual: 1186300, projected: 1274000 },
  { date: "2025-03-17", time: "5:00 AM", actual: 1184100, projected: 1275000 },
  { date: "2025-03-17", time: "6:00 AM", actual: 1187600, projected: 1276000 },
  { date: "2025-03-17", time: "7:00 AM", actual: 1187600, projected: 1277000 },
  { date: "2025-03-17", time: "8:00 AM", actual: 1186300, projected: 1278000 },
  { date: "2025-03-17", time: "9:00 AM", actual: 1186300, projected: 1279000 },
  { date: "2025-03-17", time: "10:00 AM", actual: 1184100, projected: 1280000 },
  { date: "2025-03-17", time: "11:00 AM", actual: 1184700, projected: 1281000 },
  { date: "2025-03-17", time: "12:00 PM", actual: 1187000, projected: 1282000 },
  { date: "2025-03-17", time: "1:00 PM", actual: 1184500, projected: 1283000 },
  { date: "2025-03-17", time: "2:00 PM", actual: 1185100, projected: 1284000 },
  { date: "2025-03-17", time: "3:00 PM", actual: 1184700, projected: 1285000 },
  { date: "2025-03-17", time: "4:00 PM", actual: 1187200, projected: 1286000 },
  { date: "2025-03-17", time: "5:00 PM", actual: 1184200, projected: 1287000 },
  { date: "2025-03-17", time: "6:00 PM", actual: 1188300, projected: 1288000 },
  { date: "2025-03-17", time: "7:00 PM", actual: 1190200, projected: 1289000 },
  { date: "2025-03-17", time: "8:00 PM", actual: 1192800, projected: 1290000 },
  { date: "2025-03-17", time: "9:00 PM", actual: 1201300, projected: 1291000 },
  { date: "2025-03-17", time: "10:00 PM", actual: 1199900, projected: 1292000 },
  { date: "2025-03-17", time: "11:00 PM", actual: 1196800, projected: 1293000 },
  { date: "2025-03-18", time: "12:00 AM", actual: 1200200, projected: 1294000 },
  { date: "2025-03-18", time: "1:00 AM", actual: 1198200, projected: 1295000 },
  { date: "2025-03-18", time: "2:00 AM", actual: 1201100, projected: 1296000 },
  { date: "2025-03-18", time: "3:00 AM", actual: 1200300, projected: 1297000 },
  { date: "2025-03-18", time: "4:00 AM", actual: 1201200, projected: 1298000 },
  { date: "2025-03-18", time: "5:00 AM", actual: 1189800, projected: 1299000 },
  { date: "2025-03-18", time: "6:00 AM", actual: 1195200, projected: 1300000 },
  { date: "2025-03-18", time: "7:00 AM", actual: 1192200, projected: 1301000 },
  { date: "2025-03-18", time: "8:00 AM", actual: 1193400, projected: 1302000 },
  { date: "2025-03-18", time: "9:00 AM", actual: 1194900, projected: 1303000 },
  { date: "2025-03-18", time: "10:00 AM", actual: 1194100, projected: 1304000 },
  { date: "2025-03-18", time: "11:00 AM", actual: 1195600, projected: 1305000 },
  { date: "2025-03-18", time: "12:00 PM", actual: 1197100, projected: 1306000 },
  { date: "2025-03-18", time: "1:00 PM", actual: 1200300, projected: 1307000 },
  { date: "2025-03-18", time: "2:00 PM", actual: 1195900, projected: 1308000 },
  { date: "2025-03-18", time: "3:00 PM", actual: 1201300, projected: 1309000 },
  { date: "2025-03-18", time: "4:00 PM", actual: 1201500, projected: 1310000 },
  { date: "2025-03-18", time: "5:00 PM", actual: 1200600, projected: 1311000 },
  { date: "2025-03-18", time: "6:00 PM", actual: 1202300, projected: 1312000 },
  { date: "2025-03-18", time: "7:00 PM", actual: 1198400, projected: 1313000 },
  { date: "2025-03-18", time: "8:00 PM", actual: 1198500, projected: 1314000 },
  { date: "2025-03-18", time: "9:00 PM", actual: 1201300, projected: 1315000 },
  { date: "2025-03-18", time: "10:00 PM", actual: 1199800, projected: 1316000 },
  { date: "2025-03-18", time: "11:00 PM", actual: 1203100, projected: 1317000 },
  { date: "2025-03-19", time: "12:00 AM", actual: 1194100, projected: 1318000 },
  { date: "2025-03-19", time: "1:00 AM", actual: 1185200, projected: 1319000 },
  { date: "2025-03-19", time: "2:00 AM", actual: 1192100, projected: 1320000 },
  { date: "2025-03-19", time: "3:00 AM", actual: 1191100, projected: 1321000 },
  { date: "2025-03-19", time: "4:00 AM", actual: 1193100, projected: 1322000 },
  { date: "2025-03-19", time: "5:00 AM", actual: 1200400, projected: 1323000 },
  { date: "2025-03-19", time: "6:00 AM", actual: 1202200, projected: 1324000 },
  { date: "2025-03-19", time: "7:00 AM", actual: 1205100, projected: 1325000 },
  { date: "2025-03-19", time: "8:00 AM", actual: 1207700, projected: 1326000 },
  { date: "2025-03-19", time: "9:00 AM", actual: 1200000, projected: 1327000 },
  { date: "2025-03-19", time: "10:00 AM", actual: 1203000, projected: 1328000 },
  { date: "2025-03-19", time: "11:00 AM", actual: 1203000, projected: 1329000 },
  { date: "2025-03-19", time: "12:00 PM", actual: 1199300, projected: 1330000 },
  { date: "2025-03-19", time: "1:00 PM", actual: 1196200, projected: 1331000 },
  { date: "2025-03-19", time: "2:00 PM", actual: 1196900, projected: 1332000 },
  { date: "2025-03-19", time: "3:00 PM", actual: 1200100, projected: 1333000 },
  { date: "2025-03-19", time: "4:00 PM", actual: 1201800, projected: 1334000 },
  { date: "2025-03-19", time: "5:00 PM", actual: 1200600, projected: 1335000 },
  { date: "2025-03-19", time: "6:00 PM", actual: 1197500, projected: 1336000 },
  { date: "2025-03-19", time: "7:00 PM", actual: 1198300, projected: 1337000 },
  { date: "2025-03-19", time: "8:00 PM", actual: 1200000, projected: 1338000 },
  { date: "2025-03-19", time: "9:00 PM", actual: 1202100, projected: 1339000 },
  { date: "2025-03-19", time: "10:00 PM", actual: 1203700, projected: 1340000 },
  { date: "2025-03-19", time: "11:00 PM", actual: 1205500, projected: 1341000 },
  { date: "2025-03-20", time: "12:00 AM", actual: 1206000, projected: 1342000 },
  { date: "2025-03-20", time: "1:00 AM", actual: 1208400, projected: 1343000 },
  { date: "2025-03-20", time: "2:00 AM", actual: 1205200, projected: 1344000 },
  { date: "2025-03-20", time: "3:00 AM", actual: 1205900, projected: 1345000 },
  { date: "2025-03-20", time: "4:00 AM", actual: 1208100, projected: 1346000 },
  { date: "2025-03-20", time: "5:00 AM", actual: 1213200, projected: 1347000 },
  { date: "2025-03-20", time: "6:00 AM", actual: 1214800, projected: 1348000 },
  { date: "2025-03-20", time: "7:00 AM", actual: 1210700, projected: 1349000 },
  { date: "2025-03-20", time: "8:00 AM", actual: 1212300, projected: 1350000 },
  { date: "2025-03-20", time: "9:00 AM", actual: 1216600, projected: 1351000 },
  { date: "2025-03-20", time: "10:00 AM", actual: 1211500, projected: 1352000 },
  { date: "2025-03-20", time: "11:00 AM", actual: 1214600, projected: 1353000 },
  { date: "2025-03-20", time: "12:00 PM", actual: 1206400, projected: 1354000 },
  { date: "2025-03-20", time: "1:00 PM", actual: 1204300, projected: 1355000 },
  { date: "2025-03-20", time: "2:00 PM", actual: 1204700, projected: 1356000 },
  { date: "2025-03-20", time: "3:00 PM", actual: 1205700, projected: 1357000 },
];

const dailyData = [
  { date: "2025-02-21", actual: 1150200, projected: 1160000 },
  { date: "2025-02-22", actual: 1157400, projected: 1145000 },
  { date: "2025-02-23", actual: 1149800, projected: 1170000 },
  { date: "2025-02-24", actual: 1143500, projected: 1195000 },
  { date: "2025-02-25", actual: 1152700, projected: 1200000 },
  { date: "2025-02-26", actual: 1168900, projected: 1205000 },
  { date: "2025-02-27", actual: 1162300, projected: 1210000 },
  { date: "2025-02-28", actual: 1175600, projected: 1215000 },
  { date: "2025-03-01", actual: 1169200, projected: 1220000 },
  { date: "2025-03-02", actual: 1176800, projected: 1225000 },
  { date: "2025-03-03", actual: 1182500, projected: 1230000 },
  { date: "2025-03-04", actual: 1167300, projected: 1235000 },
  { date: "2025-03-05", actual: 1160100, projected: 1240000 },
  { date: "2025-03-06", actual: 1178600, projected: 1245000 },
  { date: "2025-03-07", actual: 1191200, projected: 1250000 },
  { date: "2025-03-08", actual: 1183500, projected: 1255000 },
  { date: "2025-03-09", actual: 1175100, projected: 1260000 },
  { date: "2025-03-10", actual: 1182700, projected: 1265000 },
  { date: "2025-03-11", actual: 1194300, projected: 1270000 },
  { date: "2025-03-12", actual: 1185800, projected: 1275000 },
  { date: "2025-03-13", actual: 1186002, projected: 1280000 },
  { date: "2025-03-14", actual: 1174200, projected: 1285000 },
  { date: "2025-03-15", actual: 1181700, projected: 1290000 },
  { date: "2025-03-16", actual: 1186800, projected: 1295000 },
  { date: "2025-03-17", actual: 1187400, projected: 1300000 },
  { date: "2025-03-18", actual: 1200200, projected: 1305000 },
  { date: "2025-03-19", actual: 1194100, projected: 1310000 },
  { date: "2025-03-20", actual: 1206000, projected: 1315000 },
];

const weeklyData = [
  { date: "2024-12-13", actual: 1132500, projected: 1120000 },
  { date: "2024-12-20", actual: 1127800, projected: 1150000 },
  { date: "2024-12-27", actual: 1143200, projected: 1180000 },
  { date: "2025-01-03", actual: 1138900, projected: 1210000 },
  { date: "2025-01-10", actual: 1145600, projected: 1240000 },
  { date: "2025-01-17", actual: 1156700, projected: 1270000 },
  { date: "2025-01-24", actual: 1149300, projected: 1300000 },
  { date: "2025-01-31", actual: 1162800, projected: 1330000 },
  { date: "2025-02-07", actual: 1158400, projected: 1360000 },
  { date: "2025-02-14", actual: 1167900, projected: 1390000 },
  { date: "2025-02-21", actual: 1172300, projected: 1420000 },
  { date: "2025-02-28", actual: 1150200, projected: 1450000 },
  { date: "2025-03-06", actual: 1175600, projected: 1480000 },
  { date: "2025-03-13", actual: 1178600, projected: 1510000 },
  { date: "2025-03-20", actual: 1186002, projected: 1540000 },
  { date: "2025-03-27", actual: 1206000, projected: 1570000 },
];

const monthlyData = [
  { date: "2024-03-01", actual: 1148500, projected: 1155000 },
  { date: "2024-04-01", actual: 1145800, projected: 1130000 },
  { date: "2024-05-01", actual: 1138200, projected: 1105000 },
  { date: "2024-06-01", actual: 1138900, projected: 1080000 },
  { date: "2024-07-01", actual: 1132600, projected: 1055000 },
  { date: "2024-08-01", actual: 1136700, projected: 1030000 },
  { date: "2024-09-01", actual: 1138300, projected: 1005000 },
  { date: "2024-10-01", actual: 1132800, projected: 980000 },
  { date: "2024-11-01", actual: 1148400, projected: 955000 },
  { date: "2024-12-01", actual: 1142900, projected: 930000 },
  { date: "2025-01-01", actual: 1157900, projected: 905000 },
  { date: "2025-02-01", actual: 1162300, projected: 880000 },
  { date: "2025-03-01", actual: 1169200, projected: 855000 },
];

const yearlyData = [
  { date: "2016-01-01", actual: 920500, projected: 950000 },
  { date: "2017-01-01", actual: 967800, projected: 980000 },
  { date: "2018-01-01", actual: 988200, projected: 1010000 },
  { date: "2019-01-01", actual: 998900, projected: 1040000 },
  { date: "2020-01-01", actual: 892600, projected: 1070000 },
  { date: "2021-01-01", actual: 916700, projected: 1100000 },
  { date: "2022-01-01", actual: 988300, projected: 1130000 },
  { date: "2023-01-01", actual: 1022800, projected: 1160000 },
  { date: "2024-01-01", actual: 1128400, projected: 1190000 },
  { date: "2025-01-01", actual: 1169200, projected: 1220000 },
];

const formatDate = (dateStr: string, period: string) => {
  const date = new Date(dateStr);
  if (period === "1d") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else if (period === "1w") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (period === "1m") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  } else if (period === "1y") {
    return date.toLocaleDateString("en-US", { year: "numeric" });
  } else {
    return dateStr;
  }
};

const chartConfig = {
  actual: {
    label: "Actual",
    color: "var(--chart-1)",
  },
  projected: {
    label: "Projected",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const TIME_PERIOD_OPTIONS = ["1h", "1d", "1w", "1m", "1y"];

const ViewOption = ({ id, value }: { id: string; value: string }) => {
  return (
    <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-2 whitespace-nowrap transition-colors select-none uppercase text-foreground has-data-[state=unchecked]:text-muted-foreground">
      {value}
      <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
    </label>
  );
};

interface CustomCursorProps {
  fill?: string;
  pointerEvents?: string;
  height?: number;
  points?: Array<{ x: number; y: number }>;
  className?: string;
}

function CustomCursor(props: CustomCursorProps) {
  const { fill, pointerEvents, height, points, className } = props;

  if (!points || points.length === 0) {
    return null;
  }

  const { x, y } = points[0]!;
  return (
    <>
      <Rectangle
        x={x - 12}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={24}
        height={height}
        className={className}
        type="linear"
      />
      <Rectangle
        x={x - 1}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={1}
        height={height}
        className="recharts-tooltip-inner-cursor"
        type="linear"
      />
    </>
  );
}

export function Chart03({
  name,
  currentBalance,
  roi,
}: // chartData,
{
  name: string;
  currentBalance: number;
  roi: number;
}) {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState("1h");
  const selectedIndex = TIME_PERIOD_OPTIONS.indexOf(selectedValue);

  // Determine which data set to use based on the selected time period
  const getChartDataForTimePeriod = () => {
    switch (selectedValue) {
      case "1h":
        return hourlyData;
      case "1d":
        return dailyData;
      case "1w":
        return weeklyData;
      case "1m":
        return monthlyData;
      case "1y":
        return yearlyData;
      default:
        return hourlyData;
    }
  };

  const chartDataToUse = getChartDataForTimePeriod();

  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle>{name}</CardTitle>
            <div className="flex items-start flex-col gap-2">
              <div className=" text-muted-foreground font-bold text-2xl">
                $ {currentBalance.toLocaleString()}
              </div>
              <div className="text-emerald-500 text-sm font-medium">
                ↗ $2,849.27 ({roi}%)
              </div>
              {/* <Badge
                className={`mt-1.5 border-none ${
                  roi < 0
                    ? "bg-destructive/20 text-destructive"
                    : "bg-primary/24 text-primary"
                }`}
              >
                {roi}%
              </Badge> */}
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-xs bg-chart-1"
                ></div>
                <div className="text-[13px]/3 text-muted-foreground/50">
                  Actual
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-xs bg-chart-3"
                ></div>
                <div className="text-[13px]/3 text-muted-foreground/50">
                  Projected
                </div>
              </div>
            </div>
            <div className="bg-muted dark:bg-background/50 inline-flex h-8 rounded-full p-1 shrink-0">
              <RadioGroup
                value={selectedValue}
                onValueChange={setSelectedValue}
                className="group text-xs after:bg-background dark:after:bg-card/64 has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[repeat(5,1fr)] items-center gap-0 font-medium after:absolute after:inset-y-0 after:w-1/5 after:rounded-full after:shadow-xs dark:after:inset-shadow-[0_1px_rgb(255_255_255/0.15)] after:transition-[translate,box-shadow] after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] [&:after]:translate-x-[calc(var(--selected-index)*100%)]"
                data-state={selectedValue}
                style={
                  {
                    "--selected-index": selectedIndex,
                  } as React.CSSProperties
                }
              >
                {TIME_PERIOD_OPTIONS.map((value) => (
                  <ViewOption key={value} id={id} value={value} />
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-72 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/10 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-(--chart-1)/25 [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border dark:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-card [&_.recharts-cartesian-axis-line]:stroke-border dark:[&_.recharts-cartesian-axis-line]:stroke-card"
        >
          <LineChart
            accessibilityLayer
            key={selectedValue}
            data={chartDataToUse}
            margin={{ left: 4, right: 12, top: 12 }}
          >
            <defs>
              <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--chart-2)" />
                <stop offset="100%" stopColor="var(--chart-1)" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="2 2" />
            <XAxis
              dataKey={selectedValue === "1h" ? "time" : "date"}
              tickLine={false}
              tickMargin={12}
              minTickGap={40}
              tickFormatter={(value) => formatDate(value, selectedValue)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDataOverflow={true}
              domain={["dataMin - 1000", "dataMax + 1000"]}
              tickFormatter={(value) => {
                if (value === 0) return "$0.00";
                return `$${(value / 1000).toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}k`;
              }}
            />
            <ChartTooltip
              content={
                <CustomTooltipContent
                  colorMap={{
                    actual: "var(--chart-1)",
                    projected: "var(--chart-3)",
                  }}
                  labelMap={{
                    actual: "Actual",
                    projected: "Projected",
                  }}
                  dataKeys={["actual", "projected"]}
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                />
              }
              cursor={<CustomCursor fill="var(--chart-1)" />}
            />
            <Line
              type="linear"
              dataKey="projected"
              stroke="var(--color-projected)"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              type="linear"
              dataKey="actual"
              stroke={`url(#${id}-gradient)`}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--chart-1)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
