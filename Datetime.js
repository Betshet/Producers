// le fichier me sert pas pour l'instant mais il va me servir pour utiliser les datetime sql. Donc il ne faut pas le supprimer, c'est normal s'il ne sert pas pour le moment

function sqlToJsDate(sqlDate){
    //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    var sqlDateArr1 = sqlDate.split("-");
    //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sqlDateArr2 = sqlDateArr1[2].split(" ");
    //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    //format of sqlDateArr3[] = ['hh','mm','ss.ms']
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];
    var sqlDateArr4 = sqlDateArr3[2].split(".");
    //format of sqlDateArr4[] = ['ss','ms']
    var sSecond = sqlDateArr4[0];
    var sMillisecond = sqlDateArr4[1];

    return sYear,sMonth,sDay,sHour,sMinute;
}

function jsDateToSql(sYear, sMonth, sDay, sHour, sMinute){
    //Change the parameters to SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
    var sqlDate = sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute + ":00.00";

    return sqlDate;
}
